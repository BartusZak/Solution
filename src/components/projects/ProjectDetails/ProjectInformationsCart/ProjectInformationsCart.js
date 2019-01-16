import React from 'react'
import './ProjectInformationsCart.scss';
import { contains } from '../../../../services/methods';

const projectInformationsCart = props => {
    const { t } = props;
    return (
    <React.Fragment>
        <h4>{props.headerTitle}</h4>
        <ul className="project-overview">
        {props.items.keys.map((i, index) => {
            var field = props.originalObject[i];
            if(field !== null && typeof(field) === "string")
            {
                if(field === "Do uzupełnienia") field = t("ToFill")
                else if(field === "do@uzupelnienia.pl") field = t("ToFillEmail")
                else if(field.includes("Do uzupelnienia") || field.includes("do@uzupelnienia.pl"))
                    field = ""
            }
            return (
                <li key={i}>
                    {
                        field && props.items.names[index] &&
                        <span>{t(props.items.names[index])}: </span>
                    }

                    {field &&

                    props.items.names[index] && t(props.items.names[index]) === t("ParentName") ?
                    <b className="clickable" onClick={ () => props.pushIntoRoute(props.match.path.slice(0,-3) + props.originalObject.parentId) }>
                    {
                     (props.dateKeys &&
                     contains(i, props.dateKeys) ?
                     field.slice(0, 10) :
                     field)
                    }
                    </b> : field &&
                    <b>
                        {
                         (props.dateKeys &&
                         contains(i, props.dateKeys) ?
                         field.slice(0, 10) :
                         field)
                        }
                    </b>
                    }

                </li>
            );
        })}
        </ul>
    </React.Fragment>
    );

};

export default projectInformationsCart;

