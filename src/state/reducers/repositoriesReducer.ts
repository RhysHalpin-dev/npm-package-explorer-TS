import { ActionType } from '../action-types';
import { Action } from '../actions';

interface RepositoriesState {
  // using this interface ensures reducers can only set  properties accordingly
  loading: boolean;
  error: string | null;
  data: string[];
}

//initial state stops reducer error
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  if (action.type === 'search_repositories_success') {
    // 100% certainty that 'action' satifies the
    // searchRepositoriesSuccessAction interface
  }

  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
