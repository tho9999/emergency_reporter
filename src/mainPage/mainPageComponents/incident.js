class Incident {
    constructor(witness_name, witness_phone,emergency_info,location, picture,comments) {
      // Initialize variables
        this.witness_name= witness_name;
        this.witness_phone= witness_phone;
        this.emergency_info = emergency_info;
        this.location = location;
        this.picture = picture;
        this.comments = comments;
        const now = new Date();

        //autofill time
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.time = currentTime
        this.status = "OPEN"
     
    }
  
    getWitnessName() {
        return this.witness_name;
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

    setWitnessName(witness_name) {
        this.witness_name = witness_name;
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
  
