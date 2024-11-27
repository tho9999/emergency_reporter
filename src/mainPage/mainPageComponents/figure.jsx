import "../mainPage.css";

function Figure({ incident }) {
    return (
        <figure>
            {incident.getPicture() && <img src={`${incident.getPicture()}`} />}
            <p><strong>Type: </strong>{incident.getEmergencyInfo()}</p>
            <p><strong>Reported by: </strong>{incident.getWitnessName()}  ({incident.getWitnessPhone()})</p>
            <p><strong>Time: </strong>{incident.getTime()} </p>
            <p><strong>Status: </strong>{incident.getStatus()} {/*This will need to be implemented*/}<a>Change</a></p>
            <p><strong>Comments: </strong>{incident.getComments()} </p>
        </figure>
    );
}

export default Figure;