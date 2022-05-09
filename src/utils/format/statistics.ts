import { ICallStatisticsItem } from 'types/statistics';

class Statistics {
  static getCustomCallStatisticsByConsultantItem(
    all: ICallStatisticsItem,
    incoming: ICallStatisticsItem,
    outcoming: ICallStatisticsItem,
    branchName: string,
    teamName = '',
    name = '',
    tmrCode = '',
    date = '',
  ) {
    return {
      branch_name: branchName,
      team_name: teamName,
      name,
      tmr_cd: tmrCode,
      date,
      all_total_call: all.total_call,
      all_connect_call: all.connect_call,
      all_fail_call: all.fail_call,
      all_total_time: all.total_time,
      all_ring_time: all.ring_time,
      all_talk_time: all.talk_time,
      incoming_total_call: incoming.total_call,
      incoming_connect_call: incoming.connect_call,
      incoming_fail_call: incoming.fail_call,
      incoming_total_time: incoming.total_time,
      incoming_ring_time: incoming.ring_time,
      incoming_talk_time: incoming.talk_time,
      outcoming_total_call: outcoming.total_call,
      outcoming_connect_call: outcoming.connect_call,
      outcoming_fail_call: outcoming.fail_call,
      outcoming_total_time: outcoming.total_time,
      outcoming_ring_time: outcoming.ring_time,
      outcoming_talk_time: outcoming.talk_time,
    };
  }

  static getCustomCallStatisticsByTeamItem(
    all: ICallStatisticsItem,
    incoming: ICallStatisticsItem,
    outcoming: ICallStatisticsItem,
    branchName: string,
    teamName = '',
    date = '',
  ) {
    return {
      branch_name: branchName,
      team_name: teamName,
      date,
      all_total_call: all.total_call,
      all_connect_call: all.connect_call,
      all_fail_call: all.fail_call,
      all_total_time: all.total_time,
      all_ring_time: all.ring_time,
      all_talk_time: all.talk_time,
      incoming_total_call: incoming.total_call,
      incoming_connect_call: incoming.connect_call,
      incoming_fail_call: incoming.fail_call,
      incoming_total_time: incoming.total_time,
      incoming_ring_time: incoming.ring_time,
      incoming_talk_time: incoming.talk_time,
      outcoming_total_call: outcoming.total_call,
      outcoming_connect_call: outcoming.connect_call,
      outcoming_fail_call: outcoming.fail_call,
      outcoming_total_time: outcoming.total_time,
      outcoming_ring_time: outcoming.ring_time,
      outcoming_talk_time: outcoming.talk_time,
    };
  }
}

export default Statistics;
