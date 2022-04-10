export class UserRequest {
    constructor () {
      upper_bound = 0;
      lower_bound = 0;
      interval_time = 0; //mins
    };
  
    isFilled () {
      return (upper_bound !== 0 && lower_bound !== 0 && interval_time !== 0)
    }
  };
  
  export class User {
    userInfo = null;
    userRequest = new UserRequest;
  
    constructor (userInfo) {
      this.userInfo = userInfo;
      this.userRequest = new UserRequest();
    }
  
    setUpper (up) {
      this.userRequest.upper_bound = up;
    }
  
    setLower (low) {
      this.userRequest.lower_bound = low;
    }
  
    setTime (interval) {
      this.userRequest.interval_time = interval;
    }
  
    isFilled () {
      return this.userRequest.isFilled;
    }
  };