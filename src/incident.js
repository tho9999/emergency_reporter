export default class Incident {
    constructor(witness_first_name,witness_last_name, witness_phone,emergency_info,long,lat, picture,comments) {
      // Initialize variables
        this.witness_first_name= witness_first_name;
        this.witness_last_name= witness_last_name;
        this.witness_phone= witness_phone;
        this.emergency_info = emergency_info;
        this.location = [parseFloat(long),parseFloat(lat)];
        if(picture !== null){
            this.picture = picture;
        }
        else{this.picture = null;}
        this.comments = comments;
        const now = new Date();

        //autofill time
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = months[now.getMonth()]
        const year = now.getFullYear();
        const day = now.getDate();
        let hours = now.getHours();
        const amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const currentTime = `${month} ${day}, ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${amPm}`;
        this.time = currentTime
        this.status = "OPEN"
     
    }
  
    getWitnessName() {
        return `${this.witness_first_name} ${this.witness_last_name}`;
    }

    getWitnessPhone() {
        return this.witness_phone;
    }

    getEmergencyInfo() {
        return this.emergency_info;
    }

    getLocation() {
        return this.location;
    }

    getPicture() {
        return this.picture;
    }

    getComments() {
        return this.comments;
    }

    getTime() {
        return this.time;
    }

    getStatus() {
        return this.status;
    }

    setWitnessFirstName(witness_first_name) {
        this.witness_first_name = witness_first_name;
    }

    setWitnessLastName(witness_last_name) {
        this.witness_last_name = witness_last_name;
    }

    setWitnessPhone(witness_phone) {
        this.witness_phone = witness_phone;
    }

    setEmergencyInfo(emergency_info) {
        this.emergency_info = emergency_info;
    }

    setLocation(location) {
        this.location = location;
    }

    setPicture(picture) {
        this.picture = picture;
    }

    setComments(comments) {
        this.comments = comments;
    }

    setTime(time) {
        this.time = time;
    }

    setStatus(status) {
        this.status = status;
    }
  }