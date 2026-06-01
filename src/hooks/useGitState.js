import { useReducer } from 'react';

const initialState = {
  workingDirectory: [],   // Array of file objects: { name, type, status }
  stagingArea: [],        // Files staged with git add
  localRepo: {            // Commit history
    commits: [],          // Array of: { hash, message, branch, timestamp }
    branches: ['main'],
    currentBranch: 'main',
    HEAD: null,
  },
  stash: [],              // Stashed changesets
  remote: {               // Simulated origin
    connected: false,
    url: '',
    commits: [],
    aheadBy: 0,
    behindBy: 0,
  },
};

function generateHash() {
  return Math.random().toString(16).substring(2, 9);
}

function gitReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        workingDirectory: [
          { name: 'index.html', type: 'file', status: 'Untracked' },
          { name: 'style.css', type: 'file', status: 'Modified' },
          { name: 'app.js', type: 'file', status: 'Untracked' }
        ]
      };
      
    case 'STATUS':
      return state;
      
    case 'ADD': {
      const fileIndex = state.workingDirectory.findIndex(f => f.name === action.payload);
      if (fileIndex === -1) return state;
      
      const file = state.workingDirectory[fileIndex];
      return {
        ...state,
        workingDirectory: state.workingDirectory.filter((_, i) => i !== fileIndex),
        stagingArea: [...state.stagingArea, { ...file, status: 'Staged' }]
      };
    }

    case 'TOUCH': {
      if (!action.payload) return state;

      const fileName = action.payload;
      const existsInWorkingDirectory = state.workingDirectory.some((file) => file.name === fileName);
      const existsInStagingArea = state.stagingArea.some((file) => file.name === fileName);

      if (existsInWorkingDirectory || existsInStagingArea) return state;

      return {
        ...state,
        workingDirectory: [
          { name: fileName, type: 'file', status: 'Untracked' },
          ...state.workingDirectory
        ]
      };
    }

    case 'RM': {
      if (!action.payload) return state;

      const fileName = action.payload;
      return {
        ...state,
        workingDirectory: state.workingDirectory.filter((file) => file.name !== fileName),
        stagingArea: state.stagingArea.filter((file) => file.name !== fileName)
      };
    }
      
    case 'ADD_ALL':
      return {
        ...state,
        stagingArea: [
          ...state.stagingArea,
          ...state.workingDirectory.map(f => ({ ...f, status: 'Staged' }))
        ],
        workingDirectory: []
      };
      
    case 'COMMIT': {
      if (state.stagingArea.length === 0) return state;
      
      const newCommit = {
        hash: generateHash(),
        message: action.payload,
        branch: state.localRepo.currentBranch,
        timestamp: new Date().toISOString()
      };
      
      return {
        ...state,
        stagingArea: [],
        localRepo: {
          ...state.localRepo,
          commits: [newCommit, ...state.localRepo.commits],
          HEAD: newCommit.hash
        },
        remote: { ...state.remote, aheadBy: state.remote.aheadBy + 1 }
      };
    }
      
    case 'PUSH': {
      if (state.remote.aheadBy === 0 && state.localRepo.commits.length === state.remote.commits.length) return state;
      
      return {
        ...state,
        remote: {
          ...state.remote,
          connected: true,
          commits: [...state.localRepo.commits],
          aheadBy: 0
        }
      };
    }
      
    case 'PULL':
      return {
        ...state,
        remote: {
          ...state.remote,
          behindBy: 0
        }
      };
      
    case 'BRANCH':
      if (!action.payload) return state; 
      if (state.localRepo.branches.includes(action.payload)) return state;
      return {
        ...state,
        localRepo: {
          ...state.localRepo,
          branches: [...state.localRepo.branches, action.payload]
        }
      };
      
    case 'SWITCH': {
      let branchName = action.payload.name;
      const isCreate = action.payload.create;
      
      let newBranches = state.localRepo.branches;
      if (isCreate && !newBranches.includes(branchName)) {
        newBranches = [...newBranches, branchName];
      }
      
      if (!newBranches.includes(branchName)) return state; 
      
      return {
        ...state,
        localRepo: {
          ...state.localRepo,
          branches: newBranches,
          currentBranch: branchName
        }
      };
    }
      
    case 'STASH':
      if (state.workingDirectory.length === 0 && state.stagingArea.length === 0) return state;
      
      return {
        ...state,
        stash: [
          {
            id: generateHash(),
            message: `WIP on ${state.localRepo.currentBranch}`,
            files: [...state.workingDirectory, ...state.stagingArea]
          },
          ...state.stash
        ],
        workingDirectory: [],
        stagingArea: []
      };
      
    case 'STASH_POP': {
      if (state.stash.length === 0) return state;
      
      const stashedItem = state.stash[0];
      return {
        ...state,
        stash: state.stash.slice(1),
        workingDirectory: [...state.workingDirectory, ...stashedItem.files.map(f => ({...f, status: 'Modified'}))]
      };
    }
      
    case 'RESTORE':
      return {
        ...state,
        workingDirectory: []
      };
      
    case 'LOG':
      return state;

    case 'DIFF':
      return state;
      
    case 'REMOTE_ADD':
      return {
        ...state,
        remote: {
          ...state.remote,
          connected: true,
          url: action.payload
        }
      };
      
    default:
      return state;
  }
}

export function useGitState() {
  const [state, dispatch] = useReducer(gitReducer, initialState);
  return { state, dispatch };
}
