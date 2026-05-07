export default [
  {
    id: 1,
    title: 'Start a Project',
    tfsEquivalent: 'Create new TFS workspace',
    description: 'In Git, you initialize a repository locally first. Try setting up a new Git repository.',
    command: 'git init',
    highlightZone: 'localRepo',
    successCondition: "state => state.localRepo.commits.length >= 0",
    tip: 'Unlike TFS workspaces that map to a server path, git init creates a hidden .git folder giving you full version control locally.'
  },
  {
    id: 2,
    title: 'Check Your Changes',
    tfsEquivalent: 'View pending changes',
    description: 'You have modified a file called style.css. See what Git thinks about your working directory.',
    command: 'git status',
    highlightZone: 'workingDirectory',
    successCondition: "state => true",
    tip: 'git status is your best friend. It shows what files are modified and whether they are staged for the next commit.'
  },
  {
    id: 3,
    title: 'Stage Your Changes',
    tfsEquivalent: 'Selecting files for Check In',
    description: 'You have modified style.css. Now add it to the staging area.',
    command: 'git add style.css',
    highlightZone: 'stagingArea',
    successCondition: "state => state.stagingArea.length > 0",
    tip: 'In TFS, you selected which pending changes to include in a Check In. git add does the same — you choose exactly which files go into the next commit.'
  },
  {
    id: 4,
    title: 'Commit to History',
    tfsEquivalent: 'Check In (local only)',
    description: 'Now that style.css is staged, save it to your local history.',
    command: 'git commit -m "Update styles"',
    highlightZone: 'localRepo',
    successCondition: "state => state.localRepo.commits.length > 0",
    tip: 'Unlike TFS, a commit does NOT send files to the server. It only saves a snapshot in your local repository.'
  },
  {
    id: 5,
    title: 'Push to the Team',
    tfsEquivalent: 'Share your changeset',
    description: 'Your changes are committed locally. Now share them with the remote server.',
    command: 'git push',
    highlightZone: 'remote',
    successCondition: "state => state.remote.commits.length > 0",
    tip: 'This is the second half of a TFS Check In. Only when you push do your teammates gain access to your commits.'
  },
  {
    id: 6,
    title: 'Save Work in Progress',
    tfsEquivalent: 'Create a Shelveset',
    description: 'You are working on a file but need to switch tasks. Save your changes temporarily without committing.',
    command: 'git stash',
    highlightZone: 'stash',
    successCondition: "state => state.stash.length > 0",
    tip: 'Stashes are local only. They do not go to the server like TFS Shelvesets do.'
  }
];
