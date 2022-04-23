import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import {
  ICustomCallStatisticeByConsultantItem,
  ICustomCallStatisticeByTeamItem,
  IStatisticsState,
  TStatisticsAction,
} from 'types/statistics';
import StatisticsFormat from 'utils/format/statistics';

// 상태
const initialState: IStatisticsState = {
  request: {
    getStatistics: {
      fetch: false,
      error: '',
    },
    getCallStatisticsByConsultant: {
      fetch: false,
      error: '',
    },
    getCallStatisticsByTeam: {
      fetch: false,
      error: '',
    },
    getAutoMessageStatistics: {
      fetch: false,
      error: '',
    },
    getMessageStatistics: {
      fetch: false,
      error: '',
    },
  },
  statistics: [],
  callStatisticsByConsultant: [],
  callStatisticsByConsultantAllCount: 0,
  callStatisticsByTeam: [],
  callStatisticsByTeamAllCount: 0,
  autoMessageStatistics: [],
  autoMessageStatisticsAllCount: 0,
  messageStatistics: [],
  messageStatisticsAllCount: 0,
  allAutoMessageStatistics: [],
  allMessageStatistics: [],
  allCallStatisticsByConsultant: [],
  allCallStatisticsByTeam: [],
};

// 리듀서
const authReducer = createReducer<IStatisticsState, TStatisticsAction>(
  initialState,
  {
    [actions.REQUEST_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = true;
      });
    },
    [actions.SUCCESS_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.statistics = action.payload;

        draft.request.getStatistics.fetch = false;
        if (state.request.getStatistics.error) {
          draft.request.getStatistics.error = '';
        }
      });
    },
    [actions.FAILURE_GET_STATISTICS]: (state, action) => {
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = false;
        draft.request.getStatistics.error = action.payload;
      });
    },
    [actions.REQUEST_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByConsultant.fetch = true;
      });
    },
    [actions.SUCCESS_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByConsultant.fetch = false;
        draft.request.getCallStatisticsByConsultant.error = '';

        let callStatisticsByConsultant: Array<ICustomCallStatisticeByConsultantItem> =
          [];

        // 공통
        action.payload.list.map((values) => {
          const {
            all,
            branch_name,
            id,
            incoming,
            name,
            outcoming,
            sub_total,
            team_name,
            tmr_cd,
          } = values;

          const consultantDataLength = all.length;

          const customCallStatisticsData = [
            ...new Array(consultantDataLength),
          ].map((key, index) => {
            return StatisticsFormat.getCustomCallStatisticsByConsultantItem(
              all[index],
              incoming[index],
              outcoming[index],
              branch_name,
              team_name,
              name,
              tmr_cd,
              all[index].date,
            );
          });

          if (sub_total) {
            if (
              callStatisticsByConsultant.length > 0 &&
              callStatisticsByConsultant[callStatisticsByConsultant.length - 1]
                .branch_name === '소계'
            ) {
              // 일+시간 조회 조건일 경우 발생하는 문제
              // 데이터 중 바로 위 데이터가 소계인 경우 쌓지 않도록 처리
              return null;
            }

            if (customCallStatisticsData.length < 1) {
              // 일+시간 조회 조건일 경우 발생하는 문제
              // 데이터는 없는데 소계 데이터는 있을 경우 쌓지 않도록 처리
              return null;
            }

            const subTotalData =
              StatisticsFormat.getCustomCallStatisticsByConsultantItem(
                sub_total.all,
                sub_total.incoming,
                sub_total.outcoming,
                '소계',
              );

            customCallStatisticsData.push(subTotalData);
          }

          callStatisticsByConsultant = callStatisticsByConsultant.concat(
            customCallStatisticsData,
          );
        });

        const total = action.payload.common.total;
        const totalData =
          StatisticsFormat.getCustomCallStatisticsByConsultantItem(
            total.all,
            total.incoming,
            total.outcoming,
            '합계',
          );

        if (action.payload.isExcel) {
          callStatisticsByConsultant.push(totalData);

          // 받아온 값을 커스텀하여 추가(이차원 배열 => 일차원 배열)
          draft.allCallStatisticsByConsultant = callStatisticsByConsultant;

          return;
        }

        const allCount = action.payload.common.cnt; // 전체 인원 개수
        const currentPage = action.payload.page; // 현재 페이지
        const limit = action.payload.limit; // 요청 개수

        if (allCount && currentPage * limit >= allCount) {
          callStatisticsByConsultant.push(totalData);
        }

        draft.callStatisticsByConsultantAllCount = allCount;
        // 받아온 값을 커스텀하여 추가(이차원 배열 => 일차원 배열)
        draft.callStatisticsByConsultant = callStatisticsByConsultant;
      });
    },
    [actions.FAILURE_GET_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 가져오기 실패
      return produce(state, (draft) => {
        draft.request.getStatistics.fetch = false;
        draft.request.getStatistics.error = action.payload;
      });
    },
    [actions.REQUEST_GET_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 팀별 통화 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByTeam.fetch = true;
      });
    },
    [actions.SUCCESS_GET_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 팀별 통화 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByTeam.fetch = false;
        draft.request.getCallStatisticsByTeam.error = '';

        // 공통
        let callStatisticsByTeam: Array<ICustomCallStatisticeByTeamItem> = [];

        action.payload.list.map((values) => {
          const {
            branch_name,
            all,
            id,
            incoming,
            outcoming,
            sub_total,
            team_name,
          } = values;

          const teamDataLength = all.length;

          const customCallStatisticsData = [...new Array(teamDataLength)].map(
            (key, index) => {
              return StatisticsFormat.getCustomCallStatisticsByTeamItem(
                all[index],
                incoming[index],
                outcoming[index],
                branch_name,
                team_name,
                all[index].date,
              );
            },
          );

          if (sub_total) {
            const subTotalData =
              StatisticsFormat.getCustomCallStatisticsByTeamItem(
                sub_total.all,
                sub_total.incoming,
                sub_total.outcoming,
                '소계',
              );

            customCallStatisticsData.push(subTotalData);
          }

          callStatisticsByTeam = callStatisticsByTeam.concat(
            customCallStatisticsData,
          );
          return customCallStatisticsData;
        });

        const total = action.payload.common.total;
        const totalData = StatisticsFormat.getCustomCallStatisticsByTeamItem(
          total.all,
          total.incoming,
          total.outcoming,
          '합계',
        );

        if (action.payload.isExcel) {
          callStatisticsByTeam.push(totalData);

          // 받아온 값을 커스텀하여 추가(이차원 배열 => 일차원 배열)
          draft.allCallStatisticsByTeam = callStatisticsByTeam;

          return;
        }

        const allCount = action.payload.common.cnt; // 전체 인원 개수
        const currentPage = action.payload.page; // 현재 페이지
        const limit = action.payload.limit; // 요청 개수

        if (allCount && currentPage * limit >= allCount) {
          callStatisticsByTeam.push(totalData);
        }

        draft.callStatisticsByTeamAllCount = allCount;
        // 받아온 값을 커스텀하여 추가(이차원 배열 => 일차원 배열)
        draft.callStatisticsByTeam = callStatisticsByTeam;
      });
    },
    [actions.FAILURE_GET_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 팀별 통화 통계 가져오기 실패
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByTeam.fetch = false;
        draft.request.getCallStatisticsByTeam.error = action.payload;
      });
    },
    [actions.REQUEST_GET_AUTO_MESSAGE_STATISTICS]: (state, action) => {
      // 자동 문자 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getAutoMessageStatistics.fetch = true;
      });
    },
    [actions.SUCCESS_GET_AUTO_MESSAGE_STATISTICS]: (state, action) => {
      // 자동 문자 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.request.getAutoMessageStatistics.fetch = false;
        draft.request.getAutoMessageStatistics.error = '';

        if (action.payload.isExcel) {
          draft.allAutoMessageStatistics = action.payload.list;

          return;
        }

        draft.autoMessageStatistics = action.payload.list;
        draft.autoMessageStatisticsAllCount = action.payload.cnt;
      });
    },
    [actions.FAILURE_GET_AUTO_MESSAGE_STATISTICS]: (state, action) => {
      // 자동 문자 통계 가져오기 실패
      return produce(state, (draft) => {
        draft.request.getAutoMessageStatistics.fetch = false;
        draft.request.getAutoMessageStatistics.error = action.payload;
      });
    },
    [actions.REQUEST_GET_MESSAGE_STATISTICS]: (state, action) => {
      // 문자 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getMessageStatistics.fetch = true;
      });
    },
    [actions.SUCCESS_GET_MESSAGE_STATISTICS]: (state, action) => {
      // 문자 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.request.getMessageStatistics.fetch = false;
        draft.request.getMessageStatistics.error = '';

        if (action.payload.isExcel) {
          draft.allMessageStatistics = action.payload.list;

          return;
        }

        draft.messageStatistics = action.payload.list;
        draft.messageStatisticsAllCount = action.payload.cnt;
      });
    },
    [actions.FAILURE_GET_MESSAGE_STATISTICS]: (state, action) => {
      // 문자 통계 가져오기 실패
      return produce(state, (draft) => {
        draft.request.getMessageStatistics.fetch = false;
        draft.request.getMessageStatistics.error = action.payload;
      });
    },
    [actions.SET_INITIALIZE_CALL_STATISTICS_BY_CONSULTANT]: (state, action) => {
      // 상담원별 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.callStatisticsByConsultant = [];
        draft.callStatisticsByConsultantAllCount = 0;
      });
    },
    [actions.SET_INITIALIZE_AUTO_MESSAGE_STATISTICS]: (state, action) => {
      // 상담원별 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.autoMessageStatistics = [];
        draft.autoMessageStatisticsAllCount = 0;
      });
    },
    [actions.SET_INITIALIZE_MESSAGE_STATISTICS]: (state, action) => {
      // 문자 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.messageStatistics = [];
        draft.messageStatisticsAllCount = 0;
      });
    },
    [actions.SET_INITIALIZE_ALL_CALL_STATISTICS_BY_CONSULTANT]: (
      state,
      action,
    ) => {
      // 전체 상담원별 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.allCallStatisticsByConsultant = [];
      });
    },
    [actions.SET_INITIALIZE_ALL_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 전체 팀별 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.allCallStatisticsByTeam = [];
      });
    },
    [actions.SET_INITIALIZE_ALL_AUTO_MESSAGE_STATISTICS]: (state, action) => {
      // 전체 자동 문자 통계 초기화하기
      return produce(state, (draft) => {
        draft.allAutoMessageStatistics = [];
      });
    },
    [actions.SET_INITIALIZE_ALL_MESSAGE_STATISTICS]: (state, action) => {
      // 전체 문자 통화 통계 초기화하기
      return produce(state, (draft) => {
        draft.allMessageStatistics = [];
      });
    },
  },
);

export default authReducer;
