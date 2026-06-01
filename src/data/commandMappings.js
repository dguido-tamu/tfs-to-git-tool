export default [
  {
    id: 1,
    tfsAction: 'Create Workspace + Get Latest',
    gitEquivalent: 'git clone <url>',
    keyDifference: 'Git combines mapping the remote repository and downloading the files into a single step.',
    example: 'git clone https://github.com/org/repo.git',
    lessonId: 1
  },
  {
    id: 2,
    tfsAction: 'Get Latest (ongoing)',
    gitEquivalent: 'git pull',
    keyDifference: 'Fetches AND merges remote changes into current branch',
    example: 'git pull origin main',
    lessonId: 5
  },
  {
    id: 3,
    tfsAction: 'Check Out (file lock)',
    gitEquivalent: '(just edit the file)',
    keyDifference: 'Git has no file locking — edit freely',
    example: 'code index.html',
    lessonId: 2
  },
  {
    id: 4,
    tfsAction: 'Check In',
    gitEquivalent: 'git add + git commit + git push',
    keyDifference: 'Three steps: stage → commit locally → push to remote',
    example: 'git add .\ngit commit -m "Fix bug"\ngit push',
    lessonId: 4
  },
  {
    id: 5,
    tfsAction: 'Shelveset',
    gitEquivalent: 'git stash',
    keyDifference: 'Stash is local only — does NOT go to the server',
    example: 'git stash\ngit stash pop',
    lessonId: 6
  },
  {
    id: 6,
    tfsAction: 'Label',
    gitEquivalent: 'git tag',
    keyDifference: 'Tags must be pushed separately with `git push --tags`',
    example: 'git tag v1.0.0',
    lessonId: null
  },
  {
    id: 8,
    tfsAction: 'Changeset',
    gitEquivalent: 'Commit (git log)',
    keyDifference: 'Commits are local-first; shared only when pushed',
    example: 'git commit -m "Changeset message"',
    lessonId: 4
  },
  {
    id: 9,
    tfsAction: 'Undo Pending Changes',
    gitEquivalent: 'git restore .',
    keyDifference: 'Discards all working directory changes permanently',
    example: 'git restore src/',
    lessonId: null
  },
  {
    id: 10,
    tfsAction: 'Merge (TFS)',
    gitEquivalent: 'git merge <branch>',
    keyDifference: 'Git merges are branch-to-branch',
    example: 'git merge feature-branch',
    lessonId: null
  },
  {
    id: 11,
    tfsAction: 'Branch (TFS server)',
    gitEquivalent: 'git switch -c <name>',
    keyDifference: 'Branches are free, local, and disposable',
    example: 'git switch -c feature/login',
    lessonId: null
  },
  {
    id: 12,
    tfsAction: 'Code Review (TFS)',
    gitEquivalent: 'Pull Request (PR)',
    keyDifference: 'Opened on remote (GitHub/Azure DevOps) after push',
    example: '(Done via web browser, not CLI)',
    lessonId: null
  },
  {
    id: 13,
    tfsAction: 'History / Changesets',
    gitEquivalent: 'git log --oneline',
    keyDifference: 'Full history lives locally — no server needed',
    example: 'git log -n 5',
    lessonId: null
  }
];
