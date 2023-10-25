import { useEffect, useState } from "react";
import "../../../assets/css/homeProfile/ChannelProfile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getListUser,
  selectUserInfoByUserName,
  selectUserList,
} from "../../../features/auth/userSlice";
import { Link, useParams } from "react-router-dom";
import {getStoredUserData} from "../../../services/accountService";
import axios from "axios";

function Channel({ subscriptions }) {
  const user = useSelector(selectUserInfoByUserName);
  const [userList, setUserList] = useState([]);
  const users = useSelector(selectUserList);
  const dispatch = useDispatch();

  const { userName } = useParams();

  useEffect(() => {
    axios({
      url: `http://localhost:8080/api/users/list-user`,
      method: "post",
      headers: {
        Authorization: "Bearer " + getStoredUserData()?.accessToken,
      },
      data: {
        userIdList: subscriptions,
      },
    }).then((res) => {
      setUserList(res.data.data);
    });
  }, [userName]);

  return (
    <div className="container">
      <div className="d-flex flex-column mt-4">
        <div className="channelHomeProfile-title">Subscribed channels</div>

        <div className="row my-4 ">
          {userList && userList.length > 0 ? (
            userList.map((channel) => {
              if (`@${channel?.userName}` == userName) {
                return <></>;
              } else {
                return (
                  <div className="col-2 mb-3" key={channel.id}>
                    <Link to={`/homeProfile/@${channel.userName}/*`}>
                      <div className="d-flex mb-3 flex-column align-items-center">
                        <img
                          src={channel.avatar}
                          className="img-fluid rounded-circle avatar-channelHomeProfile"
                        />

                        <div className="mt-1 name-text">
                          {channel.channelName}
                        </div>

                        <div className="mt-1 subcribe-text">
                          {channel.subscribers} người đăng ký
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })
          ) : (
            <p>No Subscribe Channel </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Channel;
