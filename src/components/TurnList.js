import React from "react";
import {connect} from "react-redux";
import {Card} from "./Card";
import {Space} from "./Space";

const TurnList = ({turnActivity}) => {

    return (
        <ul>
            {turnActivity.map((activity, key) => {
                return <li key={key} className={activity.player.bug.cssClass}>
                    {activity.player.bug.name} - <Card card={activity.card}/> - <Space space={activity.space}/>
                </li>
            })}
        </ul>
    );
};

const mapStateToProps = state => ({
    turnActivity: state.turnActivity
});

export default connect(mapStateToProps)(TurnList);