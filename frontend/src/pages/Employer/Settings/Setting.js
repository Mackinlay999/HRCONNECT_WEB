
import React, { useState } from 'react';
import SettingStyle from '../Settings/Setting.module.css';
import { useNavigate } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaSync } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbUserExclamation } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLogOut } from '../../../Redux/ReduxSlice';
import toast from 'react-hot-toast';
import axios from "axios";

function Setting() {
  const { name, profileImage } = useSelector((state) => state.Assessment.currentUser);
  const [settingtype, setsettingtype] = useState("");
  const hrEmail = localStorage.getItem("email")
  const navi = useNavigate();
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(handleUserLogOut())
    toast.success(`${name} Logged out !!`)
    setTimeout(() => {
      navi('/dashboard')
    }, 1000);
  }

  const [del, setDel] = useState(false)
  const handleDeleteAccount = () => {
    setDel(true)
  }
  const handlePopupClose = () => { setDel(false) }

  const handleAgree = () => {
    axios.delete(`http://localhost:8585/api/hr/delete-hr/${hrEmail}`)
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`);
          dispatch(handleUserLogOut());
          navi('/login');
        }
        else {
          toast.error("Try Again !!!");
          handlePopupClose();
        }
      })
      .catch(err => {
        toast.error(`${err.msg}`);
        handlePopupClose();
      })
  }

  // Function to render content based on setting type
  const renderSettingContent = () => {
    switch (settingtype) {
      case "Setting/Profile":
        return (
          <div className={SettingStyle.profile_designs}>
            <div className={SettingStyle.Profile_cont2}>
              <div className={SettingStyle.Profile_cont2_One}>
                <p><FaSync /></p>
                <span>Sync</span>
              </div>
              <div className={SettingStyle.Profile_cont2_One}>
                <p><RiUserSettingsFill /></p>
                <span>Profile Preference</span>
              </div>
              <div className={SettingStyle.Profile_cont2_One}>
                <p><TbUserExclamation /></p>
                <span>Personal Info</span>
              </div>
            </div>

            <div className={SettingStyle.Profile_cont1}>
              <button className={SettingStyle.__pfEditBtn} onClick={() => { navi('/Setting/Editprofile') }}>Edit My Profile</button>
              <button className={SettingStyle.__pfLogoutBtn} onClick={handleLogOut}> <FaArrowRightToBracket />Logout</button>
              <button className={SettingStyle.__pfDeleteBtn} onClick={handleDeleteAccount}> <GoTrash /> Delete Account</button>
            </div>
            {
              del && <div className={SettingStyle.__popupDelete}>
                <p style={{ fontWeight: "500", fontSize: "20px" }}>Are you sure you want to delete ??</p>
                <p>
                  <button className={SettingStyle.__btnAgree} onClick={handleAgree}>Agree</button>
                  <button className={SettingStyle.__btnCancel} onClick={handlePopupClose}>Cancel</button>
                </p>
              </div>
            }

          </div>
        );
      case "Setting/privacy":
        return (
          <div>
            <h3>Privacy Settings</h3>
            <p>This is where you can manage your privacy preferences.</p>
          </div>
        );

      case "Setting/appearance":
        return (
          <div>
            <div className={`${SettingStyle.Appearance} ${SettingStyle.Profile_cont2}`}>
              <div className={SettingStyle.Profile_cont2_One}>
                <span>Dark Mode</span>
              </div>
              <div className={SettingStyle.Profile_cont2_One}>
                <span>Font Size</span>
              </div>
              <div className={SettingStyle.Profile_cont2_One}>
                <span>Any other appearance button</span>
              </div>
            </div>
          </div>
        );

      case "Setting/notification":
        return (
          <div>
            <div className={`${SettingStyle.notification} ${SettingStyle.Profile_cont1}`}>
              <div className={SettingStyle.checkboxex}>
                <label for='check'>gsbvcxbv</label>
                <div className={SettingStyle.checkbox1}>
                  <input type='checkbox' id='check' className={SettingStyle.click}></input>
                  <span>Allow Notification</span>
                </div>
              </div>
              <div className={SettingStyle.checkboxex}>
                <label for='check'>gsbvcxbv</label>
                <div className={SettingStyle.checkbox1}>
                  <input type='checkbox' id='check' className={SettingStyle.click}></input>
                  <span>Allow Notification</span>
                </div>
              </div>
              <div className={SettingStyle.checkboxex}>
                <label for='check'>gsbvcxbv</label>
                <div className={SettingStyle.checkbox1}>
                  <input type='checkbox' id='check' className={SettingStyle.click}></input>
                  <span>Allow Notification</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Setting/support":
        return (
          <div>
          </div>
        );

      default:
        return (
          <div>
            <h5 className={SettingStyle.__defaultText}>Select any option from the list</h5>
          </div>
        );
    }
  };

  return (
    <div className={SettingStyle.my_setting_container}>
      <div className={SettingStyle.my_profile_box}>
        <img className={SettingStyle.__hrImg} title='Profile'
          src={profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'}
          alt='profile_img'
          onError={(e) => { e.target.src = `https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg`; e.onError = null; }}
        />
        <h4 className={SettingStyle.__pfGreet}> {name}</h4>
      </div>

      <div className={SettingStyle.Setting_opt_container}>
        <div className={SettingStyle.setting_opt_left}>
          <div className={settingtype === "Setting/Profile" ? `${SettingStyle.setting_opt_active} ` : `${SettingStyle.setting_opt}`} onClick={() => setsettingtype("Setting/Profile")}>
            <i className="fa-solid fa-user" /> Profile
          </div>
          <div className={settingtype === "Setting/privacy" ? `${SettingStyle.setting_opt_active}` : `${SettingStyle.setting_opt}`} onClick={() => setsettingtype("Setting/privacy")}>
            <i className="fa-solid fa-lock" /> Privacy & Service
          </div>
          <div className={settingtype === "Setting/appearance" ? `${SettingStyle.setting_opt_active}` : `${SettingStyle.setting_opt}`} onClick={() => setsettingtype("Setting/appearance")}>
            <i className="fa-solid fa-wand-magic-sparkles" /> Appearance
          </div>

          <div className={settingtype === "Setting/support" ? `${SettingStyle.setting_opt_active}` : `${SettingStyle.setting_opt}`} onClick={() => setsettingtype("Setting/support")} >
            <i className="fa-solid fa-headset" /> Support
          </div>
        </div>
        <div className={SettingStyle.setting_opt_right}>
          {renderSettingContent()}
        </div>
      </div>
    </div>
  );
}

export default Setting;
