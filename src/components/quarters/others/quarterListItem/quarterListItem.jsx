import React from 'react'
import './quarterListItem.scss';
import QuarterDetalilsItem from '../quarterDetailsItem/quarterDetailsItem';
import { translate } from "react-translate";

const quarterListItem = ({index, item, clickItemFunction, currentWatchedItemId, isDetailItemFromEmployeeDetails, answers, t}) => (
    <div className={`single-quarter ${item.isDeleted ? "deleted-quarter" : ""} ${index === currentWatchedItemId ? "current-watched-item" : ""}`} onClick={e => clickItemFunction(e)}>
        <p>
            <i title={t("PeopleToTalkWith")} className="fa fa-user"></i>
            <span title={t("PeopleToTalkWith")}>{item.questionerId}</span>
            <span className="span-light">{item.isTaken ? t("QuarterItemSubHeader") : t("Conduct")}</span>
            {item.isTaken && !isDetailItemFromEmployeeDetails &&
                <i title={t("DownloadTalkInDoc")} onClick={e => clickItemFunction(e, "generateDoc")} className="fa fa-file-alt"></i>
            }
            <i title={item.isTaken ? t("DoneQuarter") : t("IncomingQuarter")} className={`fas fa-${item.isTaken ? "check" : "question"}`}></i>
        </p>
        <p>
            <span className="clickable">

                 {t("ForQuarter")} {item.quarter} {t("Quarter")} <b>{t("In")}</b> {item.year} {t("InYear")}
            </span>
            <span className="span-light" title={item.isTaken ? t("QuarterTalkDate") : t("PlannedQuarterTalkDate")}>
                <i className="fa fa-calendar-alt"></i>{item.isTaken ? item.aswerQuestionDate : item.plannedTalkDate}
            </span>
        </p>
        <p className={(isDetailItemFromEmployeeDetails && index === currentWatchedItemId) ? "border-paragraph" : ""}>
            {isDetailItemFromEmployeeDetails && item.isTaken &&
                <span className="details-span" onClick={e => clickItemFunction(e, "expendDetails")}>
                    <i className={`fa fa-chevron-down ${index === currentWatchedItemId ? "rot-chev" : ""}`}></i>
                </span>
            }
            {isDetailItemFromEmployeeDetails ||
                <span className="delete-span" onClick={e => clickItemFunction(e, "delete")}>{t("Delete")}</span>
            }
        </p>
        {isDetailItemFromEmployeeDetails && index === currentWatchedItemId && item.isTaken &&
            answers.length > 0 && answers.map((answer, index) => (
                <QuarterDetalilsItem item={answer} key={index}/>
            ))
        }
        {item.isDeleted &&
            <div className="backdrop-prompt">
                <p>{t("QuarterDeletedPrompt")}</p>
                <span onClick={e => clickItemFunction(e, t("Reactivate"))}>{t("Reactivate")}</span>
            </div>
        }

    </div>
);
export default translate("Quaters")(quarterListItem);
