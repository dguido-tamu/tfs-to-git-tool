export default [
  {
    term: 'Branch',
    definition: 'A movable pointer to a commit. Branches in Git are incredibly lightweight and local.',
    tfsNote: 'Unlike TFS branches, Git branches are not physical folders. They are just pointers.'
  },
  {
    term: 'Checkout / Switch',
    definition: 'Updates files in the working tree to match the version in the index or the specified tree.',
    tfsNote: 'In Git, "checkout" means switching context (like branches), not locking a file.'
  },
  {
    term: 'Clone',
    definition: 'Creates a full local copy of an existing remote repository, including its complete history.',
    tfsNote: 'Similar to Get Latest for the first time, but downloads the entire server history to your hard drive.'
  },
  {
    term: 'Commit',
    definition: 'A snapshot of the repository at a specific point in time.',
    tfsNote: 'Like a Changeset, but local only. You must "push" a commit to share it.'
  },
  {
    term: 'Fetch',
    definition: 'Downloads commits, files, and refs from a remote repository into your local repo, without merging.',
    tfsNote: 'No exact TFS equivalent. It lets you see what others have done before you merge it in.'
  },
  {
    term: 'HEAD',
    definition: 'A pointer indicating your current working branch or commit.',
    tfsNote: 'Similar to the concept of your active workspace version.'
  },
  {
    term: 'Index / Staging Area',
    definition: 'A holding area where you gather changes you want to include in your next commit.',
    tfsNote: 'Like the "Included Changes" section when you prepare a TFS Check In.'
  },
  {
    term: 'Merge',
    definition: 'Takes the independent lines of development created by branches and integrates them into a single branch.',
    tfsNote: 'Git merges are branch-to-branch, often done locally before pushing.'
  },
  {
    term: 'Origin',
    definition: 'The default conventional name given to the remote repository that a project was cloned from.',
    tfsNote: 'Think of this as the central TFS Server URL.'
  },
  {
    term: 'Pull',
    definition: 'Fetches changes from a remote and immediately merges them into your current branch.',
    tfsNote: 'The equivalent of "Get Latest".'
  },
  {
    term: 'Push',
    definition: 'Uploads local commits to a remote repository.',
    tfsNote: 'The second half of a TFS Check In. Commits are not visible to the team until pushed.'
  },
  {
    term: 'Rebase',
    definition: 'Moves or combines a sequence of commits to a new base commit, creating a linear history.',
    tfsNote: 'No direct TFS equivalent. Advanced technique to keep history clean.'
  },
  {
    term: 'Remote',
    definition: 'A common repository that all team members use to exchange their changes (e.g., hosted on GitHub).',
    tfsNote: 'The TFS Server.'
  },
  {
    term: 'Repository',
    definition: 'The database containing all branches, tags, and commits (history). In Git, everyone has a full copy.',
    tfsNote: 'Unlike TFVC where the repository only lives on the server.'
  },
  {
    term: 'Stage',
    definition: 'The act of marking a modified file to be part of the next commit using git add.',
    tfsNote: 'Moving a file from "Excluded" to "Included" changes.'
  },
  {
    term: 'Stash',
    definition: 'Temporarily shelves changes you\'ve made to your working copy so you can work on something else.',
    tfsNote: 'Exactly like a Shelveset, but stashes are strictly local.'
  },
  {
    term: 'Tag',
    definition: 'A specific, fixed point in the repository history, usually used for releases.',
    tfsNote: 'Equivalent to a TFS Label.'
  },
  {
    term: 'Working Directory',
    definition: 'The files you see on your computer\'s file system where you do your work.',
    tfsNote: 'Equivalent to a TFS Workspace folder.'
  }
];
