import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // dispatch can only be of the imported Action types

    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      //fetching data from npm registry using axios with params set to search term
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );
      // map over recieved data to return related package name related to search term
      const names = data.objects.map((result: any) => {
        return result.package.name;
      });
      // set dispatch to success to show successfull search and set payload result of names map
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err: any) {
      // if search fails catch error, set type and payload accordingly
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};

export default searchRepositories;
