import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as types from 'modules/actions/organization';
import { OrganizationAction, OrganizationState } from 'types/organization';

const initialState: OrganizationState<string> = {
  request: {
    getOrganization: {
      fetch: false,
      error: '',
    },
    getBranch: {
      fetch: false,
      error: '',
    },
    getPluralBranch: {
      fetch: false,
      error: '',
    },
    getPluralTeam: {
      fetch: false,
      error: '',
    },
    getTeam: {
      fetch: false,
      error: '',
    },
    addBranch: {
      fetch: false,
      error: '',
    },
    modifyBranch: {
      fetch: false,
      error: '',
    },
    removeBranch: {
      fetch: false,
      error: '',
    },
    addTeam: {
      fetch: false,
      error: '',
    },
    modifyTeam: {
      fetch: false,
      error: '',
    },
    removeTeam: {
      fetch: false,
      error: '',
    },
  },
  organizations: {},
  branch: {
    all: [],
    user: [],
  },
  team: {
    all: [],
    user: [],
  },
  plural_branch: [],
  plural_team: [],
  numberOfBranch: 0,
};

const userReducer = createReducer<
  OrganizationState<string>,
  OrganizationAction
>(initialState, {
  [types.REQUEST_GET_ORGANIZATION]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getOrganization.fetch = true;
    });
  },
  [types.SUCCESS_GET_ORGANIZATION]: (state, action) => {
    const keys = Object.keys(action.payload);
    const values = Object.values(action.payload);

    let organizations = {};

    keys.map((value, i) => {
      // 팀명 입력할 수 있는 란을 만들기 위해 추가
      values[i].push({
        id: 0,
        team_name: '',
        branch_id: Number(value),
      });

      organizations = {
        ...organizations,
        [value]: values[i],
      };
    });

    return produce(state, (draft) => {
      draft.organizations = organizations;
      draft.numberOfBranch = keys.length;
      draft.request.getOrganization.fetch = false;
      draft.request.getOrganization.error = '';
    });
  },
  [types.FAILURE_GET_ORGANIZATION]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getOrganization.fetch = false;
      draft.request.getOrganization.error = action.payload;
    });
  },
  [types.REQUEST_GET_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getBranch.fetch = true;
      draft.request.getBranch.error = '';
    });
  },
  [types.SUCCESS_GET_BRANCH]: (state, action) => {
    action.payload.sort((r1, r2) => {
      return r1.branch_name < r2.branch_name
        ? 1
        : r1.branch_name > r2.branch_name
        ? -1
        : 0;
    });

    action.payload.push({
      id: -1,
      branch_name: '센터명',
    });

    return produce(state, (draft) => {
      draft.branch.all = action.payload.reverse();
      draft.request.getBranch.fetch = false;
      draft.request.getBranch.error = '';
    });
  },
  [types.SUCCESS_GET_USER_BRANCH]: (state, action) => {
    action.payload.sort((r1, r2) => {
      return r1.branch_name < r2.branch_name
        ? 1
        : r1.branch_name > r2.branch_name
        ? -1
        : 0;
    });

    action.payload.push({
      id: -1,
      branch_name: '센터명',
    });

    return produce(state, (draft) => {
      draft.branch.user = action.payload.reverse();
      draft.request.getBranch.fetch = false;
      draft.request.getBranch.error = '';
    });
  },
  [types.FAILURE_GET_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getBranch.fetch = false;
      draft.request.getBranch.error = action.payload;
    });
  },
  [types.REQUEST_GET_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getTeam.fetch = true;
      draft.request.getTeam.error = '';
    });
  },
  [types.SUCCESS_GET_TEAM]: (state, action) => {
    action.payload.sort((r1, r2) => {
      return r1.team_name < r2.team_name
        ? 1
        : r1.team_name > r2.team_name
        ? -1
        : 0;
    });

    action.payload.push({
      id: -1,
      branch_id: -1,
      team_name: '팀명',
    });

    return produce(state, (draft) => {
      draft.team.all = action.payload.reverse();

      draft.request.getTeam.fetch = false;
      draft.request.getTeam.error = '';
    });
  },
  [types.SUCCESS_GET_USER_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getTeam.fetch = false;
      draft.request.getTeam.error = '';
      action.payload.sort((r1, r2) => {
        return r1.team_name < r2.team_name
          ? 1
          : r1.team_name > r2.team_name
          ? -1
          : 0;
      });
      action.payload.push({
        id: -1,
        team_name: '팀명',
        branch_id: -1,
      });
      draft.team.user = action.payload.reverse();
    });
  },
  [types.FAILURE_GET_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getTeam.fetch = false;
      draft.request.getTeam.error = action.payload;
    });
  },
  [types.ADD_TEMPERATURE_BRANCH]: (state, action) => {
    const keys = Object.keys(state.organizations);

    return produce(state, (draft) => {
      draft.organizations = {
        ...draft.organizations,
        temp: [
          {
            id: 'temp',
            branch_name: '',
          },
          {
            id: 0,
            team_name: '',
            branch_id: 'temp',
          },
        ],
      };
      draft.numberOfBranch = keys.length;
    });
  },
  [types.ADD_TEMPERATURE_TEAM]: (state, action) => {
    const keys = Object.keys(state.organizations).sort(
      (e1: string, e2: string) => {
        return Number(e1) - Number(e2);
      },
    );
    const index = Number(keys[keys.length - 1]) + 1;

    return produce(state, (draft) => {
      draft.organizations = {
        ...draft.organizations,
        [index]: [
          {
            id: 0,
            team_name: '',
            branch_id: index,
          },
        ],
      };
    });
  },
  [types.REQUEST_ADD_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addBranch.fetch = true;
      draft.request.addBranch.error = '';
    });
  },
  [types.SUCCESS_ADD_BRANCH]: (state, action) => {
    const { name, id } = action.payload;
    return produce(state, (draft) => {
      draft.request.addBranch.fetch = false;
      draft.request.addBranch.error = '';
      draft.organizations = {
        ...draft.organizations,
        [id]: [
          {
            id: id,
            branch_name: name,
          },
          {
            branch_id: id,
            id: 0,
            team_name: '',
          },
        ],
      };

      const _draft: any = draft.organizations;
      delete _draft.temp;
    });
  },
  [types.FAILURE_ADD_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addBranch.fetch = false;
      draft.request.addBranch.error = action.payload;
    });
  },
  [types.REQUEST_ADD_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addTeam.fetch = true;
      draft.request.addTeam.error = '';
    });
  },
  [types.SUCCESS_ADD_TEAM]: (state, action) => {
    const { branch_id, before_id, next_id, name } = action.payload;

    return produce(state, (draft) => {
      const _draft: any = draft.organizations;

      _draft[branch_id][_draft[branch_id].length - 1].id = next_id;
      _draft[branch_id][_draft[branch_id].length - 1].team_name = name;
      _draft[branch_id].push({
        branch_id,
        id: 0,
        team_name: '',
      });

      draft.request.addTeam.fetch = false;
      draft.request.addTeam.error = '';
    });
  },
  [types.FAILURE_ADD_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.addTeam.fetch = false;
      draft.request.addTeam.error = action.payload;
    });
  },
  [types.REQUEST_MODIFY_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyBranch.fetch = true;
      draft.request.modifyBranch.error = '';
    });
  },
  [types.SUCCESS_MODIFY_BRANCH]: (state, action) => {
    const { id, name } = action.payload;

    return produce(state, (draft) => {
      const _draft: any = draft.organizations;
      const index = _draft[id].findIndex((value: any) => {
        return value.branch_name && value.id === id;
      });
      _draft[id][index].branch_name = name;

      draft.request.modifyBranch.fetch = false;
      draft.request.modifyBranch.error = '';
    });
  },
  [types.FAILURE_MODIFY_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyBranch.fetch = false;
      draft.request.modifyBranch.error = action.payload;
    });
  },
  [types.REQEUST_MODIFY_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyTeam.fetch = true;
      draft.request.modifyTeam.error = '';
    });
  },
  [types.SUCCESS_MODIFY_TEAM]: (state, action) => {
    const { branch_id, id, name } = action.payload;

    return produce(state, (draft) => {
      const _draft: any = draft.organizations;
      const index = _draft[branch_id].findIndex((value: any) => {
        return value.team_name && value.id === id;
      });

      _draft[branch_id][index].team_name = name;

      draft.request.modifyTeam.fetch = false;
      draft.request.modifyTeam.error = '';
    });
  },
  [types.FAILURE_MODIFY_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.modifyTeam.fetch = false;
      draft.request.modifyTeam.error = action.payload;
    });
  },
  [types.REQUEST_REMOVE_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeBranch.fetch = true;
      draft.request.removeBranch.error = '';
    });
  },
  [types.SUCCESS_REMOVE_BRANCH]: (state, action) => {
    const { branch_id } = action.payload;

    return produce(state, (draft) => {
      draft.request.removeBranch.fetch = false;
      draft.request.removeBranch.error = '';

      const _draft: any = draft.organizations;
      delete _draft.organizations[branch_id];
    });
  },
  [types.FAILURE_REMOVE_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeBranch.fetch = false;
      draft.request.removeBranch.error = action.payload;
    });
  },
  [types.REQUEST_REMOVE_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeTeam.fetch = true;
      draft.request.removeTeam.error = '';
    });
  },
  [types.SUCCESS_REMOVE_TEAM]: (state, action) => {
    const { branch_id, team_id } = action.payload;

    return produce(state, (draft) => {
      draft.request.removeTeam.fetch = false;
      draft.request.removeTeam.error = '';
      const _draft: any = draft.organizations;
      const newTeamInfo = _draft[branch_id].filter((value: any) => {
        return value.id !== team_id;
      });
      _draft[branch_id] = newTeamInfo;
    });
  },
  [types.FAILURE_REMOVE_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.removeTeam.fetch = false;
      draft.request.removeTeam.error = action.payload;
    });
  },
  [types.REQUEST_GET_PLURAL_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralBranch.fetch = true;
      draft.request.getPluralBranch.error = '';
    });
  },
  [types.SUCCESS_GET_PLURAL_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.plural_branch = action.payload;
      draft.request.getPluralBranch.fetch = false;
      draft.request.getPluralBranch.error = '';
    });
  },
  [types.FAILURE_GET_PLURAL_BRANCH]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralBranch.fetch = false;
      draft.request.getPluralBranch.error = action.payload;
    });
  },
  [types.REQUEST_GET_PLURAL_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralTeam.fetch = true;
      draft.request.getPluralTeam.error = '';
    });
  },
  [types.SUCCESS_GET_PLURAL_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.plural_team = action.payload;
      draft.request.getPluralTeam.fetch = false;
      draft.request.getPluralTeam.error = '';
    });
  },
  [types.FAILURE_GET_PLURAL_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.request.getPluralTeam.fetch = false;
      draft.request.getPluralTeam.error = action.payload;
    });
  },
  [types.SET_INIT_PLURAL_TEAM]: (state, action) => {
    return produce(state, (draft) => {
      draft.plural_team = [];
    });
  },
});

export default userReducer;
