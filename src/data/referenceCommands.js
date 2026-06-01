export default {
  core: [
    {
      name: 'git init',
      syntax: 'git init',
      description: 'Create a new, empty Git repository locally (rarely used when migrating an existing project).',
      tfsEquivalent: 'No exact equivalent (creates a new local repo from scratch)',
      example: 'git init'
    },
    {
      name: 'git status',
      syntax: 'git status',
      description: 'Show the working tree status.',
      tfsEquivalent: 'View Pending Changes',
      example: 'git status'
    },
    {
      name: 'git add',
      syntax: 'git add <file>',
      description: 'Add file contents to the staging area.',
      tfsEquivalent: 'Select for Check In',
      example: 'git add .'
    },
    {
      name: 'git commit',
      syntax: 'git commit -m "<message>"',
      description: 'Record changes to the local repository.',
      tfsEquivalent: 'Check In (local part)',
      example: 'git commit -m "Fix bug #123"'
    },
    {
      name: 'git log',
      syntax: 'git log',
      description: 'Show commit logs.',
      tfsEquivalent: 'View History',
      example: 'git log --oneline'
    }
  ],
  branching: [
    {
      name: 'git branch',
      syntax: 'git branch <name>',
      description: 'List, create, or delete branches.',
      tfsEquivalent: 'Branch',
      example: 'git branch feature-x'
    },
    {
      name: 'git switch',
      syntax: 'git switch <branch>',
      description: 'Switch branches. Modern replacement for git checkout when switching branches.',
      tfsEquivalent: 'Switch Workspace Context',
      example: 'git switch main'
    },
    {
      name: 'git merge',
      syntax: 'git merge <branch>',
      description: 'Join two or more development histories together.',
      tfsEquivalent: 'Merge',
      example: 'git merge feature-x'
    }
  ],
  remote: [
    {
      name: 'git clone',
      syntax: 'git clone <url>',
      description: 'Clone a repository into a new directory, creating the local workspace and performing the initial Get Latest in one step.',
      tfsEquivalent: 'Create Workspace + Get Latest (initial)',
      example: 'git clone https://github.com/org/repo.git'
    },
    {
      name: 'git pull',
      syntax: 'git pull',
      description: 'Fetch from and integrate with another repository or a local branch.',
      tfsEquivalent: 'Get Latest (ongoing)',
      example: 'git pull origin main'
    },
    {
      name: 'git push',
      syntax: 'git push',
      description: 'Update remote refs along with associated objects.',
      tfsEquivalent: 'Check In (server part)',
      example: 'git push origin main'
    },
    {
      name: 'git fetch',
      syntax: 'git fetch',
      description: 'Download objects and refs from another repository without merging.',
      tfsEquivalent: 'No exact equivalent',
      example: 'git fetch origin'
    }
  ],
  advanced: [
    {
      name: 'git stash',
      syntax: 'git stash',
      description: 'Stash the changes in a dirty working directory away.',
      tfsEquivalent: 'Shelve',
      example: 'git stash'
    },
    {
      name: 'git restore',
      syntax: 'git restore <file>',
      description: 'Restore working tree files.',
      tfsEquivalent: 'Undo Pending Changes',
      example: 'git restore .'
    },
    {
      name: 'git rebase',
      syntax: 'git rebase <branch>',
      description: 'Reapply commits on top of another base tip.',
      tfsEquivalent: 'No equivalent',
      example: 'git rebase main'
    }
  ],
  utilities: [
    {
      name: 'touch',
      syntax: 'touch <file>',
      description: 'Create a new empty file in the working directory.',
      tfsEquivalent: 'Add New File',
      example: 'touch index.html'
    },
    {
      name: 'rm',
      syntax: 'rm <file>',
      description: 'Remove a file from the working directory.',
      tfsEquivalent: 'Delete File',
      example: 'rm oldfile.txt'
    },
    {
      name: 'git diff',
      syntax: 'git diff',
      description: 'Show unstaged differences between working directory and staging area.',
      tfsEquivalent: 'Compare Files',
      example: 'git diff'
    }
  ]
};
