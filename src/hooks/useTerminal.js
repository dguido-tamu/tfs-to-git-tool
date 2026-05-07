export function useTerminal() {
  const parseCommand = (input) => {
    const parts = input.trim().split(/\s+/);
    if (parts[0] !== 'git') {
      if (!input.trim()) return { output: [], action: null, tfsContext: null };
      return { 
        output: [`Command not recognized. Type 'help' for available commands.`], 
        action: null,
        alert: { type: 'error', message: 'Command not recognized' },
        tfsContext: null
      };
    }

    const cmd = parts[1];
    const args = parts.slice(2);

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

      case 'commit':
        const msgIndex = args.indexOf('-m');
        let msg = 'Update';
        if (msgIndex !== -1 && args[msgIndex + 1]) {
          msg = args.slice(msgIndex + 1).join(' ').replace(/['"]/g, '');
        }
        return {
          output: [`[main] ${msg}`],
          action: { type: 'COMMIT', payload: msg },
          alert: { type: 'success', message: 'Changes committed locally' },
          tfsContext: 'In TFS, a Check In sends files to the server. A Git commit only saves to your local hard drive.'
        };

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
        if (args[0] === '-c' && args[1]) {
          return {
            output: [`Switched to a new branch '${args[1]}'`],
            action: { type: 'SWITCH', payload: { name: args[1], create: true } },
            tfsContext: 'Creates a branch and immediately switches your workspace to it.'
          };
        } else if (args[0]) {
          return {
            output: [`Switched to branch '${args[0]}'`],
            action: { type: 'SWITCH', payload: { name: args[0], create: false } },
            tfsContext: 'Changes your active workspace to match the selected branch.'
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
