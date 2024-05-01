import React, {useState} from 'react';
import '../components/popup.css'
import { StorageManager } from '@aws-amplify/ui-react-storage';
import * as mutations from '../graphql/mutations';

const PfpPopup = ({ client, user, isOpen, onClose, onSubmit }) => {
    const handleSubmit = ({key}) => {
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: user.username,
            PfpString: key
        }}});
        onSubmit(key);
    }
    const usePreset = () => {
        client.graphql({ query: mutations.updateUser, variables: { input: {
            id: user.username,
            PfpString: ""
        }}})
    }
    return (
        <div>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <StorageManager 
                            acceptedFileTypes={['image/*']}
                            path={"pfps/"+user.username+"/"}
                            maxFileCount={1}
                            isResumable
                            onUploadSuccess={handleSubmit}
                        />
                        <button className="close-btn" onClick={onClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PfpPopup