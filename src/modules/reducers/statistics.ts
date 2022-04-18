import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import * as actions from 'modules/actions/statistics';
import {
  ICustomCallStatisticeByConsultantItem,
  ICustomCallStatisticeByTeamItem,
  IStatisticsState,
  TStatisticsAction,
} from 'types/statistics';

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

        const allCount = action.payload.common.cnt; // 전체 인원 개수
        draft.callStatisticsByConsultantAllCount = allCount;

        let callStatisticsByConsultant: Array<ICustomCallStatisticeByConsultantItem> =
          [];
        action.payload.list.map((values) => {
          const consultantDataLength = values.all.length;

          const customCallStatisticsData = [
            ...new Array(consultantDataLength),
          ].map((key, index) => {
            return {
              branch_name: values.branch_name,
              team_name: values.team_name,
              name: values.name,
              tmr_cd: values.tmr_cd,
              date: values.all[index].date,
              all_total_call: values.all[index].total_call,
              all_connect_call: values.all[index].connect_call,
              all_fail_call: values.all[index].fail_call,
              all_total_time: values.all[index].total_time,
              all_ring_time: values.all[index].ring_time,
              all_talk_time: values.all[index].talk_time,
              incoming_total_call: values.incoming[index].total_call,
              incoming_connect_call: values.incoming[index].connect_call,
              incoming_fail_call: values.incoming[index].fail_call,
              incoming_total_time: values.incoming[index].total_time,
              incoming_ring_time: values.incoming[index].ring_time,
              incoming_talk_time: values.incoming[index].talk_time,
              outcoming_total_call: values.outcoming[index].total_call,
              outcoming_connect_call: values.outcoming[index].connect_call,
              outcoming_fail_call: values.outcoming[index].fail_call,
              outcoming_total_time: values.outcoming[index].total_time,
              outcoming_ring_time: values.outcoming[index].ring_time,
              outcoming_talk_time: values.outcoming[index].talk_time,
            };
          });

          if (allCount && values.sub_total) {
            const subTotalData = {
              branch_name: '소계',
              team_name: '',
              name: '',
              tmr_cd: '',
              date: '',
              all_total_call: values.sub_total.all.total_call,
              all_connect_call: values.sub_total.all.connect_call,
              all_fail_call: values.sub_total.all.fail_call,
              all_total_time: values.sub_total.all.total_time,
              all_ring_time: values.sub_total.all.ring_time,
              all_talk_time: values.sub_total.all.talk_time,
              incoming_total_call: values.sub_total.incoming.total_call,
              incoming_connect_call: values.sub_total.incoming.connect_call,
              incoming_fail_call: values.sub_total.incoming.fail_call,
              incoming_total_time: values.sub_total.incoming.total_time,
              incoming_ring_time: values.sub_total.incoming.ring_time,
              incoming_talk_time: values.sub_total.incoming.talk_time,
              outcoming_total_call: values.sub_total.outcoming.total_call,
              outcoming_connect_call: values.sub_total.outcoming.connect_call,
              outcoming_fail_call: values.sub_total.outcoming.fail_call,
              outcoming_total_time: values.sub_total.outcoming.total_time,
              outcoming_ring_time: values.sub_total.outcoming.ring_time,
              outcoming_talk_time: values.sub_total.outcoming.talk_time,
            };
            // customCallStatisticsData.push(subTotalData);
          }

          callStatisticsByConsultant = callStatisticsByConsultant.concat(
            customCallStatisticsData,
          );
          return customCallStatisticsData;
        });

        const currentPage = action.payload.page; // 현재 페이지
        const limit = action.payload.limit; // 요청 개수
        if (allCount && currentPage * limit >= allCount) {
          const total = action.payload.common.total;
          const totalData = {
            branch_name: '합계',
            team_name: '',
            name: '',
            tmr_cd: '',
            date: '',
            all_total_call: total.all.total_call,
            all_connect_call: total.all.connect_call,
            all_fail_call: total.all.fail_call,
            all_total_time: total.all.total_time,
            all_ring_time: total.all.ring_time,
            all_talk_time: total.all.talk_time,
            incoming_total_call: total.incoming.total_call,
            incoming_connect_call: total.incoming.connect_call,
            incoming_fail_call: total.incoming.fail_call,
            incoming_total_time: total.incoming.total_time,
            incoming_ring_time: total.incoming.ring_time,
            incoming_talk_time: total.incoming.talk_time,
            outcoming_total_call: total.outcoming.total_call,
            outcoming_connect_call: total.outcoming.connect_call,
            outcoming_fail_call: total.outcoming.fail_call,
            outcoming_total_time: total.outcoming.total_time,
            outcoming_ring_time: total.outcoming.ring_time,
            outcoming_talk_time: total.outcoming.talk_time,
          };

          callStatisticsByConsultant.push(totalData);
        }

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
      // 상담원별 통화 통계 가져오기
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByTeam.fetch = true;
      });
    },
    [actions.SUCCESS_GET_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 상담원별 통화 통계 가져오기 성공
      return produce(state, (draft) => {
        draft.request.getCallStatisticsByTeam.fetch = false;
        draft.request.getCallStatisticsByTeam.error = '';

        const allCount = action.payload.common.cnt; // 전체 인원 개수
        draft.callStatisticsByTeamAllCount = allCount;

        let callStatisticsByTeam: Array<ICustomCallStatisticeByTeamItem> = [];
        action.payload.list.map((values) => {
          const teamDataLength = values.all.length;

          const customCallStatisticsData = [...new Array(teamDataLength)].map(
            (key, index) => {
              return {
                branch_name: values.branch_name,
                team_name: values.team_name,
                date: values.all[index].date,
                all_total_call: values.all[index].total_call,
                all_connect_call: values.all[index].connect_call,
                all_fail_call: values.all[index].fail_call,
                all_total_time: values.all[index].total_time,
                all_ring_time: values.all[index].ring_time,
                all_talk_time: values.all[index].talk_time,
                incoming_total_call: values.incoming[index].total_call,
                incoming_connect_call: values.incoming[index].connect_call,
                incoming_fail_call: values.incoming[index].fail_call,
                incoming_total_time: values.incoming[index].total_time,
                incoming_ring_time: values.incoming[index].ring_time,
                incoming_talk_time: values.incoming[index].talk_time,
                outcoming_total_call: values.outcoming[index].total_call,
                outcoming_connect_call: values.outcoming[index].connect_call,
                outcoming_fail_call: values.outcoming[index].fail_call,
                outcoming_total_time: values.outcoming[index].total_time,
                outcoming_ring_time: values.outcoming[index].ring_time,
                outcoming_talk_time: values.outcoming[index].talk_time,
              };
            },
          );

          if (allCount && values.sub_total) {
            const subTotalData = {
              branch_name: '소계',
              team_name: '',
              date: '',
              all_total_call: values.sub_total.all.total_call,
              all_connect_call: values.sub_total.all.connect_call,
              all_fail_call: values.sub_total.all.fail_call,
              all_total_time: values.sub_total.all.total_time,
              all_ring_time: values.sub_total.all.ring_time,
              all_talk_time: values.sub_total.all.talk_time,
              incoming_total_call: values.sub_total.incoming.total_call,
              incoming_connect_call: values.sub_total.incoming.connect_call,
              incoming_fail_call: values.sub_total.incoming.fail_call,
              incoming_total_time: values.sub_total.incoming.total_time,
              incoming_ring_time: values.sub_total.incoming.ring_time,
              incoming_talk_time: values.sub_total.incoming.talk_time,
              outcoming_total_call: values.sub_total.outcoming.total_call,
              outcoming_connect_call: values.sub_total.outcoming.connect_call,
              outcoming_fail_call: values.sub_total.outcoming.fail_call,
              outcoming_total_time: values.sub_total.outcoming.total_time,
              outcoming_ring_time: values.sub_total.outcoming.ring_time,
              outcoming_talk_time: values.sub_total.outcoming.talk_time,
            };
            // customCallStatisticsData.push(subTotalData);
          }

          callStatisticsByTeam = callStatisticsByTeam.concat(
            customCallStatisticsData,
          );
          return customCallStatisticsData;
        });

        const currentPage = action.payload.page; // 현재 페이지
        const limit = action.payload.limit; // 요청 개수
        if (allCount && currentPage * limit >= allCount) {
          const total = action.payload.common.total;
          const totalData = {
            branch_name: '합계',
            team_name: '',
            date: '',
            all_total_call: total.all.total_call,
            all_connect_call: total.all.connect_call,
            all_fail_call: total.all.fail_call,
            all_total_time: total.all.total_time,
            all_ring_time: total.all.ring_time,
            all_talk_time: total.all.talk_time,
            incoming_total_call: total.incoming.total_call,
            incoming_connect_call: total.incoming.connect_call,
            incoming_fail_call: total.incoming.fail_call,
            incoming_total_time: total.incoming.total_time,
            incoming_ring_time: total.incoming.ring_time,
            incoming_talk_time: total.incoming.talk_time,
            outcoming_total_call: total.outcoming.total_call,
            outcoming_connect_call: total.outcoming.connect_call,
            outcoming_fail_call: total.outcoming.fail_call,
            outcoming_total_time: total.outcoming.total_time,
            outcoming_ring_time: total.outcoming.ring_time,
            outcoming_talk_time: total.outcoming.talk_time,
          };

          callStatisticsByTeam.push(totalData);
        }

        // 받아온 값을 커스텀하여 추가(이차원 배열 => 일차원 배열)
        draft.callStatisticsByTeam = callStatisticsByTeam;
      });
    },
    [actions.FAILURE_GET_CALL_STATISTICS_BY_TEAM]: (state, action) => {
      // 상담원별 통화 통계 가져오기 실패
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
        draft.autoMessageStatistics = action.payload.list;
        draft.autoMessageStatisticsAllCount = action.payload.cnt;
        draft.request.getAutoMessageStatistics.fetch = false;
        draft.request.getAutoMessageStatistics.error = '';
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
        draft.messageStatistics = action.payload.list;
        draft.messageStatisticsAllCount = action.payload.cnt;
        draft.request.getMessageStatistics.fetch = false;
        draft.request.getMessageStatistics.error = '';
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
  },
);

export default authReducer;
