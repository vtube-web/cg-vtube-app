import React from "react";
import style from "../../assets/scss/Components/Watching/_subscription.module.scss";
import {
  BsGrid3X2GapFill,
  BsListUl,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SubscribedScreen() {
  return (
    <div className={`${style.main} row`}>
      <div className={style.header}>
        <div className={style.tittle}>
          <p>Latest</p>
        </div>
        <div className={style.header__button}>
          <div className={style.header__button__manage}>
            <button>Manage</button>
          </div>
          <div className={style.header__button__menu}>
            <button>
              <BsGrid3X2GapFill size={24} />
            </button>
            <button>
              <BsListUl size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${style.content} row`}>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
              src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
              alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                  src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                  alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
              src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
              alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                  src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                  alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
              src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
              alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                  src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                  alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
        <div className={`${style.info} col-md-6 col-lg-4`}>
          <a href="">
            <img
                src="https://i.pinimg.com/564x/52/12/dc/5212dccf6f2e37eb54fed01f2cdba199.jpg"
                alt="img"
            />
            <div className={style.time__video}>30:56</div>
            <div className={`${style.detail} row`}>
              <div className="col-2">
                <img
                    src="https://yt3.ggpht.com/5oI9heBQT621qOEhp8xi3RMwNpV-B50Qkvrztu8joCzPo69FC3lQzorHGP0ZpJ8eDdNTMqsc7nc=s68-c-k-c0x00ffffff-no-rj-mo"
                    alt="avatar"
                />
              </div>
              <div className="col">
                <div className={style.content__tittle}>
                  Top Tier Fortnite Agent - Season 4 - LiveSeason 4 - LiveSeason
                  4 - LiveSeason 4 - Live
                </div>
                <div>name channel</div>
                <div>view • time ago</div>
              </div>
              <div className="col-2">
                <button>
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
