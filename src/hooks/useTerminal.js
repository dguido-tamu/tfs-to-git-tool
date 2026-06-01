import referenceCommands from '../data/referenceCommands';

export function useTerminal() {
  const helpFlags = new Set(['--help', '-h']);
  const commandGroups = Object.entries(referenceCommands);

  const commandLookup = commandGroups.reduce((lookup, [, commands]) => {
    commands.forEach((command) => {
      lookup[command.name] = command;

      if (command.name.startsWith('git ')) {
        const shortName = command.name.slice(4);
        lookup[shortName] = command;
      }
    });

    return lookup;
  }, {});

  const buildGlobalHelp = () => {
    const lines = ['Available commands:'];

    commandGroups.forEach(([groupName, commands]) => {
      lines.push('');
      lines.push(`${groupName.toUpperCase()}:`);
      commands.forEach((command) => {
        lines.push(`  ${command.name} - ${command.description}`);
      });
    });

    lines.push('');
    lines.push('Tip: run <command> --help for command details.');
    return lines;
  };

  const buildCommandHelp = (command) => {
    if (!command) {
      return [
        'Help not available for that command.',
        'Try --help to view all available commands.'
      ];
    }

    return [
      `${command.name}`,
      `Description: ${command.description}`,
      `Syntax: ${command.syntax}`,
      `Example: ${command.example}`,
      `TFS Equivalent: ${command.tfsEquivalent}`
    ];
  };

  const parseCommand = (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return { output: [], action: null, tfsContext: null };

    const parts = trimmedInput.split(/\s+/);
    const hasGitPrefix = parts[0] === 'git';

    const cmd = hasGitPrefix ? parts[1] : parts[0];
    const args = hasGitPrefix ? parts.slice(2) : parts.slice(1);

    if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
      return {
        output: buildGlobalHelp(),
        action: null,
        tfsContext: 'Quick reference of sandbox commands and their TFS equivalents.'
      };
    }

    if (helpFlags.has(args[0])) {
      return {
        output: buildCommandHelp(commandLookup[cmd]),
        action: null,
        tfsContext: 'Detailed command help with TFS mapping.'
      };
    }
    
    // Utility commands can be entered directly or as `git <utility>` in this sandbox.
    if (cmd === 'touch') {
      if (args[0]) {
        return {
          output: [],
          action: { type: 'TOUCH', payload: args[0] },
          alert: { type: 'success', message: `Created file ${args[0]}` },
          tfsContext: 'Creates a new empty file in your working directory.'
        };
      }
      return { output: ['Usage: touch <filename>'], action: null, tfsContext: null };
    }

    if (cmd === 'rm') {
      if (args[0]) {
        return {
          output: [],
          action: { type: 'RM', payload: args[0] },
          tfsContext: 'Removes a file from your working directory.'
        };
      }
      return { output: ['Usage: rm <filename>'], action: null, tfsContext: null };
    }
    
    if (!hasGitPrefix) {
      return { 
        output: [`Command not recognized. Type 'help' for available commands.`], 
        action: null,
        alert: { type: 'error', message: 'Command not recognized' },
        tfsContext: null
      };
    }

    switch (cmd) {
      case 'init':
        return {
          output: ['Initialized empty Git repository in .git/'],
          action: { type: 'INIT' },
          alert: { type: 'success', message: 'Repository initialized' },
          tfsContext: 'In TFS, this is like creating a new Workspace, but local-only.'
        };

      case 'status':
        return {
          output: [
            'On branch main',
            'Changes to be committed:',
            '  (use "git restore --staged <file>..." to unstage)',
            'Untracked files:',
            '  (use "git add <file>..." to include in what will be committed)'
          ],
          action: { type: 'STATUS' },
          tfsContext: 'In TFS, this is like viewing your Pending Changes.'
        };

      case 'add':
        if (args[0] === '.') {
          return {
            output: [],
            action: { type: 'ADD_ALL' },
            tfsContext: 'In TFS, this is like selecting all "Excluded Changes" to become "Included Changes".'
          };
        } else if (args[0]) {
          return {
            output: [],
            action: { type: 'ADD', payload: args[0] },
            tfsContext: `In TFS, this is like selecting ${args[0]} to be included in your Check In.`
          };
        }
        return { output: ['Nothing specified, nothing added.'] };

      case 'commit': {
        let msg = 'Update';

        for (let i = 0; i < args.length; i += 1) {
          const token = args[i];

          if (token === '-m' && args[i + 1]) {
            msg = args.slice(i + 1).join(' ');
            break;
          }

          if (token.startsWith('-m') && token.length > 2) {
            const inlineMessage = token.slice(2);
            const trailing = args.slice(i + 1).join(' ');
            msg = [inlineMessage, trailing].filter(Boolean).join(' ');
            break;
          }
        }

        msg = msg.trim().replace(/^=+/, '').replace(/^['"]|['"]$/g, '');
        if (!msg) msg = 'Update';

        return {
          output: [`[main] ${msg}`],
          action: { type: 'COMMIT', payload: msg },
          alert: { type: 'success', message: 'Changes committed locally' },
          tfsContext: 'In TFS, a Check In sends files to the server. A Git commit only saves to your local hard drive.'
        };
      }

      case 'push':
        return {
          output: ['Enumerating objects: 5, done.', 'Writing objects: 100% (3/3), done.', 'To https://github.com/org/repo.git', '   main -> main'],
          action: { type: 'PUSH' },
          alert: { type: 'success', message: 'Pushed to remote' },
          tfsContext: 'This is the second half of a TFS Check In. Your commits are now visible to the team.'
        };

      case 'pull':
        return {
          output: ['Updating', 'Fast-forward', ' 1 file changed, 2 insertions(+)'],
          action: { type: 'PULL' },
          tfsContext: 'In TFS, this is "Get Latest". It pulls server changes and merges them into your workspace.'
        };

      case 'branch':
        if (args.length === 0) {
          return {
            output: ['* main'],
            action: { type: 'BRANCH' },
            tfsContext: 'Lists your local branches.'
          };
        } else {
          return {
            output: [],
            action: { type: 'BRANCH', payload: args[0] },
            alert: { type: 'success', message: `Branch ${args[0]} created` },
            tfsContext: 'In TFS, branching copies folders on the server. In Git, it just creates a local pointer.'
          };
        }

      case 'switch':
        if (args[0] === '-c') {
          if (args[1]) {
            return {
              output: [`Switched to a new branch '${args[1]}'`],
              action: { type: 'SWITCH', payload: { name: args[1], create: true } },
              tfsContext: 'Creates a branch and immediately switches your workspace to it.'
            };
          } else {
            return { output: ['error: switch `c\' requires a value'] };
          }
        } else if (args[0]) {
          return {
            output: [`Switched to branch '${args[0]}'`],
            action: { type: 'SWITCH', payload: { name: args[0], create: false } },
            tfsContext: 'Changes your active workspace to match the selected branch.'
          };
        }
        return { output: ['Missing branch name.'] };

      case 'checkout':
        if (args[0] === '-b') {
          if (args[1]) {
            return {
              output: [`Switched to a new branch '${args[1]}'`],
              action: { type: 'SWITCH', payload: { name: args[1], create: true } },
              tfsContext: 'git checkout is the traditional way to switch branches. Modern Git prefers `git switch` which is more explicit: use `git switch -c` to create, or `git switch` to switch existing.'
            };
          } else {
            return { output: ['error: switch `b\' requires a value'] };
          }
        } else if (args[0]) {
          return {
            output: [`Switched to branch '${args[0]}'`],
            action: { type: 'SWITCH', payload: { name: args[0], create: false } },
            tfsContext: 'git checkout switches branches. Git 2.23+ introduced `git switch` as a more intuitive alternative: use `git switch` to switch, `git switch -c` to create and switch.'
          };
        }
        return { output: ['Missing branch name.'] };

      case 'merge':
        if (args[0]) {
          return {
            output: [],
            action: { type: 'MERGE', payload: args[0] },
            tfsContext: 'In TFS, this is like merging changes from one branch to another. Git merges are local until you push.'
          };
        }
        return { output: ['Missing branch name.'] };

      case 'stash':
        if (args[0] === 'pop') {
          return {
            output: ['Dropped refs/stash@{0}'],
            action: { type: 'STASH_POP' },
            tfsContext: 'Like unshelving a TFS Shelveset into your workspace.'
          };
        }
        return {
          output: ['Saved working directory and index state WIP'],
          action: { type: 'STASH' },
          tfsContext: 'Like creating a TFS Shelveset, but it strictly lives on your local machine.'
        };

      case 'log':
        return {
          output: ['commit 8a2f3b (HEAD -> main)', 'Author: You', 'Date: Just now', '    Initial commit'],
          action: { type: 'LOG' },
          tfsContext: 'Like viewing Changeset History, but you don\'t need a server connection.'
        };

      case 'restore':
        return {
          output: [],
          action: { type: 'RESTORE' },
          alert: { type: 'warning', message: 'Working directory restored' },
          tfsContext: 'Like "Undo Pending Changes" in TFS. Your uncommitted edits are gone.'
        };

      case 'diff':
        return {
          output: [
            'diff --git a/file.txt b/file.txt',
            'index 1234567..abcdefg 100644',
            '--- a/file.txt',
            '+++ b/file.txt',
            '@@ -1,3 +1,3 @@',
            ' unchanged line',
            '-old content',
            '+new content',
            ' another unchanged line'
          ],
          action: { type: 'DIFF' },
          tfsContext: 'Shows differences between your working directory and staging area. Similar to TFS Compare.'
        };

      case 'remote':
        if (args[0] === 'add' && args[1] === 'origin' && args[2]) {
          return {
            output: [],
            action: { type: 'REMOTE_ADD', payload: args[2] },
            alert: { type: 'success', message: 'Remote origin added' },
            tfsContext: 'Tells your local repo where the server is located.'
          };
        }
        return { output: ['Usage: git remote add origin <url>'] };

      default:
        return {
          output: [`git: '${cmd}' is not a git command. See 'git --help'.`],
          action: null,
          alert: { type: 'error', message: 'Command not recognized' },
          tfsContext: null
        };
    }
  };

  return { parseCommand };
}
