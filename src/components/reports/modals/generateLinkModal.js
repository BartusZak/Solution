import React from 'react'
import Modal from 'react-responsive-modal';
import Spinner from '../../common/spinner/spinner';
import './modal.scss';
import ServerError from '../../common/serverError/serverError';
import Button from '../../common/button/button';
import { translate } from 'react-translate';
import FancyModal from './../../common/fancy-modal/fancy-modal';
const generateReportModal = ({shouldOpenModal, closeModal, generateShareLinkStatus, generateShareLinkErrors,
    generatedShareLink, fileToShare, path, copyLink, isOneDrive, t}) => (
    <FancyModal close={closeModal}>
    {fileToShare &&
    <div className="modal-gen-link">
        <header>
            <h3 className={'fancy-modal-header'}>{generateShareLinkStatus === null ? t("CreatingLink") : t("CreatedLink")}<i className={'fas fa-times'} title={t("Close")} onClick={closeModal}/></h3>
        </header>
        {generateShareLinkStatus !== null ?
            generateShareLinkStatus ?
            <div className="gen-link-modal-container">
                <article>
                    <p>{t("CurrentCreatedLink")}: <b>{fileToShare.name}</b></p>
                    <div>
                        <figure>
                            <i className={`fa ${fileToShare.type === "folder" ? "fa-folder" : "fa-file"}`}></i>
                            <span onClick={copyLink}>{t("OpenIn")}
                                <i className={`fab ${isOneDrive ?
                                "fa-windows" : "fa-google-drive"}`}>
                                </i>
                            </span>
                        </figure>
                        <div>
                            <p><span>{t("Identity")}: </span><b>{fileToShare.id}</b></p>
                            <p><span>{t("Name")}: </span><b>{fileToShare.name}</b></p>
                            {fileToShare.size && fileToShare.size > 0 &&
                                <p><span>{t("Size")}: </span><b>{fileToShare.size}</b></p>
                            }

                            {fileToShare.parentPath &&
                                <p><span>{t("Path")}: </span><b>{fileToShare.parentPath}</b></p>
                            }
                        </div>
                    </div>
                </article>
                <div>
                    <span>
                        {generatedShareLink}
                    </span>
                    <Button onClick={copyLink} mainClass="generate-raport-btn btn-green">
                        <i className="fa fa-copy" /> {t("Open")}
                    </Button>
                </div>
            </div> :

            <ServerError errorClass="whole-page-error"
            message={generateShareLinkErrors[0]}/> :
            <Spinner fontSize="7px" />
        }
    </div>
    }
  </FancyModal>

);

export default translate("GenerateReportModal")(generateReportModal);
