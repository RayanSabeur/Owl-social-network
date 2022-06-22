import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts  } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils';

const NewPostForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null); //l'image qu'on va se passer frontalement, 
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();//le fichier img qu'on va s'envoyer en base
    const userData = useSelector((state) => state.userReducer);
const dispatch = useDispatch()
    const handlePicture = (e) => {

        setPostPicture(URL.createObjectURL(e.target.files[0])) //creer un objet js et nous affiche l'image en front
        setFile(e.target.files[0]);

        setVideo('')
    }
    const handlePost = async () => {
        
        if (message || postPicture || video) {

const data = new FormData()
data.append('posterId', userData._id);
data.append('message', message);

if(file) data.append("file", file);
data.append('video', video)

await dispatch(addPost(data)) // on envoie a la basse de donnée avec un dispatch tte les info du poste en tl, 
dispatch(getPosts()) //puis on redemande la data du poste en base pour recuperer les id speciaux qu'elle aura créér on est obliger de faire comme ca car mongodb c lui qui creer les id

cancelPost()

        } else {
            window.alert('veuillez entre qqchose')
        }
      

    }

   
    const cancelPost = () => {
   setMessage('');
   setPostPicture('')
   setVideo('')
   setFile('')

    }
    
    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    
        const handleVideo = () => {
          let findLink = message.split(" ");
          for (let i = 0; i < findLink.length; i++) {
            if (
              findLink[i].includes("https://www.yout") ||
              findLink[i].includes("https://yout")
            ) {
              let embed = findLink[i].replace("watch?v=", "embed/");
              setVideo(embed.split("&")[0]);
              findLink.splice(i, 1);
              findLink.splice(i, 1 )
              setMessage(findLink.join(""))
              setPostPicture('')
            }
          }
        };
        handleVideo();
      }, [userData, message, video]);
      let chemin = "/profile/"
    return (
        <div className="post-container">
        {isLoading ? (
          <i className="fas fa-spinner fa-pulse"></i>
        ) : (
          <>
            <div className="data">
              <p>
                <span>{userData.following ? userData.following.length : 0}</span>{" "}
                Abonnement
                {userData.following && userData.following.length > 1 ? "s" : null}
              </p>
              <p>
                <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
                Abonné
                {userData.followers && userData.followers.length > 1 ? "s" : null}
              </p>
            </div>
            <NavLink  to={chemin + userData.pseudo}>
              <div className="user-info">
                <img src={userData.picture} alt="user-img" />
              </div>
            </NavLink>
            <div className="post-form">
              <textarea
                name="message"
                id="message"
                placeholder="Quoi de neuf ?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              {message || postPicture || video.length > 20 ? (
                <li className="card-container">
                  <div className="card-left">
                    <img src={userData.picture} alt="user-pic" />
                  </div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="pseudo">
                        <h3>{userData.pseudo}</h3>
                      </div>
                      <span>{timestampParser(Date.now())}</span>
                    </div>
                    <div className="content">
                      <p>{message}</p>
                      <img src={postPicture} alt="" />
                      {video && (
                        <iframe
                          src={video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video}
                        ></iframe>
                      )}
                    </div>
                  </div>
                </li>
              ) : null}
              <div className="footer-form">
                <div className="icon">
                  {isEmpty(video) && (
                    <>
                      <img src="./img/icons/picture.svg" alt="img" />
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handlePicture(e)}
                      />
                    </>
                  )}
                  {video && (
                    <button onClick={() => setVideo("")}>Supprimer video</button>
                  )}
                </div>
                
                <div className="btn-send">
                  {message || postPicture || video.length > 20 ? (
                    <button className="cancel" onClick={cancelPost}>
                      Annuler message
                    </button>
                  ) : null}
                  <button className="send" onClick={handlePost}>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default NewPostForm;