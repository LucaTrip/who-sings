import React from "react";
import moment from "moment";
import { IoPersonCircleOutline } from "react-icons/io5";

import { Match } from "../models/User";

type Props = {
  matches: Match[];
  withUserName?: boolean;
};

const ScoreTable: React.FC<Props> = ({ matches, withUserName }) => {
  return (
    <div className="inline-block overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg my-5">
      <table className="table-auto m-auto">
        <thead>
          <tr>
            {withUserName ? (
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                User
              </th>
            ) : null}

            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              When
            </th>

            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Scores
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {matches.map((item) => (
            <tr key={item.timestamp}>
              {withUserName ? (
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">
                    <IoPersonCircleOutline size="30" color="black" />
                    <div className="text-sm font-medium leading-5 text-gray-900 ml-1">
                      {item.userName}
                    </div>
                  </div>
                </td>
              ) : null}

              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                  {moment(item.timestamp).format("LLL")}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-xl font-medium leading-5 text-gray-900">
                  {item.score}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
