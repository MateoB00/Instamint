// import { useEffect, useState } from 'react';
// import '../../scss/pages/profile/PageProfile.scss';
// import EditPicture from '../../components/ui/profile/EditPicture';
// import { useTranslation } from 'react-i18next';
// import { getUserData } from '../../api/auth';
// import { Link } from 'react-router-dom';
// import { usePageProfile } from '../../hooks/usePageProfile';

// export default function PageProfile() {
//   const {
//     handleProfilePictureChange,
//     formErrors,
//     setFormErrors,
//     handleRestoreOriginal,
//     handleSaveClick,
//   } = usePageProfile();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await getUserData();
//         setUserData(response);
//       } catch (error) {
//         setFormErrors('An error occurred while fetching user data.');
//       }
//     };

//     fetchUserData();
//   }, [setFormErrors]);

//   const { t } = useTranslation();

//   return (
//     <div className="popup-content">
//       <h1>{t('popup.profile.title')}</h1>
//       {userData && (
//         <>
//           <EditPicture
//             handleProfilePictureChange={handleProfilePictureChange}
//             handleRestoreOriginal={handleRestoreOriginal}
//             // profilePicture={userData.profilePicture}
//           />
//         </>
//       )}
//       <div>
//         {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
//       </div>
//       <div>
//         <button className="save" onClick={handleSaveClick} title="Save">
//           {t('popup.profile.save')}
//         </button>
//       </div>
//       <Link to="/">return to home</Link>
//     </div>
//   );
// }
