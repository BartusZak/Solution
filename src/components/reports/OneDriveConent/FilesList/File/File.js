import React from 'react';
import SmallSpinner  from '../../../../common/spinner/small-spinner';

const file = ({folder, openFolder, editFolderError, isDeletingOrEditingFolder, 
    onSubmit, currentOpenedFolderDetailName, showDeleteFolderModal, onStateChange,
    onEditFolder, onChangeFolderName, currentOpenedFolderToEditId, 
    enableFolderEdit, editFolderName, closeEditingFolderName, onFileClick, chooseFolder, choosenFolder }) => {
    return (
    <li onDoubleClick={folder.type !== "file" ? () => openFolder(folder.name, folder.id) : null}
    className={choosenFolder ? folder.name === choosenFolder.name ? "selected-folder" : null : null}

        onClick={folder.type === "file" ? 
            () => onFileClick(folder.name) : null}
        key={folder.name}>

        {(currentOpenedFolderToEditId === folder.id && folder.type !== "file") ? 
            <form onSubmit={e => onEditFolder(e, folder.name)}>

                <input className={editFolderError ? "input-error" : null}
                type="text" value={editFolderName} 
                onChange={e => onChangeFolderName(e, folder.name)} />

                { isDeletingOrEditingFolder && <SmallSpinner /> } 
                
                { isDeletingOrEditingFolder ||
                    <i onClick={e => onEditFolder(e, folder.name)} 
                    className="fa fa-check"></i>
                }
                { isDeletingOrEditingFolder || 
                    <i onClick={closeEditingFolderName} className="fa fa-times"></i>
                }
                
            </form> 
            : 
            <span>{folder.name}</span>
        }
        
        {folder.type !== "file" && 
        <i onClick={() => openFolder(folder.name, folder.id)} className="fa fa-folder-open"></i>
        }

        {folder.type !== "file" && 
            <i onClick={() => chooseFolder(folder)} className="fa fa-cloud-upload-alt"></i>
        }

        {
            folder.type !== "file" && 
            <div className="folders-icons">
                <i onClick={() => showDeleteFolderModal(folder.id)} className="fa fa-trash"></i>
                
                <i onClick={() => enableFolderEdit(folder.id, folder.name)}
                    className="fa fa-pen-square"></i>
            </div>
        }
        
        {(folder.name === currentOpenedFolderDetailName && folder.type === "file") && 
            <div className="file-details">
                <p><b>Typ</b><span>{folder.type}</span></p>
                <p><b>Rozmiar</b><span>{folder.size}</span></p>
                <p><b>Ścieżka</b><span>{folder.parentPath}</span></p>
            </div>
        }
        

    </li>
    );
}

export default file;