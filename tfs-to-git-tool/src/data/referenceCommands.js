export default {
  core: [
    {
      name: 'git init',
      syntax: 'git init',
      description: 'Initialize a new, empty Git repository locally.',
      tfsEquivalent: 'Create Workspace',
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
      description: 'Switch branches.',
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
      description: 'Clone a repository into a new directory.',
      tfsEquivalent: 'Get Latest (initial)',
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
      name: 'git log',
      syntax: 'git log',
      description: 'Show commit logs.',
      tfsEquivalent: 'View History',
      example: 'git log --oneline'
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
  ]
};
