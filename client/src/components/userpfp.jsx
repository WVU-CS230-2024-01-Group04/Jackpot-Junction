import React, { useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-react';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import kermitImg from "../images/kermit.webp";
import natureImg from "../images/winchester.jpg";
import thImg from "../images/baka.jpg";
import bwImg from "../images/beowulf.jpg";
import snoopyImg from "../images/snoopy.jpg";

const UserPfp = () => {

    const pfps = [kermitImg, natureImg, thImg, bwImg, snoopyImg];
    const [inited, setInited] = useState(false);
    const [imgnum, setImgnum] = useState(0);

    const client = generateClient();
    const {user} = useAuthenticator((context) => [context.user]);
    getPlayerInfo(user);

    // get the user's info to init states
    function getPlayerInfo(user){
        if(user != null && user.username != null){
            const getUser = client.graphql({ query: queries.getUser, variables: { id: user.username }});
            getUser.then((value) => {
                if(!inited){
                    setInited(true);
                    setImgnum(value.data.getUser.Pfp);
                }
            })
        }
    }

    // update the user's info in the database
    function pushInfo(newImg){
        if(!inited)
            return;
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: user.username,
            Pfp: newImg
        }}});
    }

    //switch the user's pfp to the next one in the list
    function nextPfp(){
        let newNum = (imgnum + 1) % pfps.length;
        setImgnum(newNum);
        pushInfo(newNum);
    }

    return(
        <button onClick={nextPfp}>
            <img src={pfps[imgnum]} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} />
        </button>
    )
}

export default UserPfp;