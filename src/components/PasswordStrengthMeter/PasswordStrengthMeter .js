import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';

class PasswordStrengthMeter extends Component {

	createPasswordLabel = (result) => {
    const { password } = this.props;
   // console.log(password.length,'result',result)

    let validated = [];

    let hasUpperCaseLetter =  /[A-Z]/g;
    let haslowerCaseLetter =  /[a-z]/g;
    let mustContainNumber = /\d+/g;
    let atleast1SpecialCharacter = /[-!(),.?"':;{}<>\[\]/_]/g;
    let identicalCharacter = /^(?:([\w\d*? !:;`.,'"@#$%^&*()/_=|\\{}\[\]<>+~-])?(?!\1))+$/g;

    
    if(password) {
     
      if(hasUpperCaseLetter.test(password)) {
        validated.push("hasUpperCaseLetter");
      } else {
        if(validated.includes("hasUpperCaseLetter")) {
          validated.map((item,i)=> {
            if(item == "hasUpperCaseLetter") {
              validated.splice(i, 1);
            }
          })
        } 
      }
      if (haslowerCaseLetter.test(password)) {
        validated.push("haslowerCaseLetter");
      } else {
        if(validated.includes("haslowerCaseLetter")) {
          validated.map((item,i)=> {
            if(item == "haslowerCaseLetter") {
              validated.splice(i, 1);
            }
          })
        } 
      }
      if ( mustContainNumber.test(password) ) {
        validated.push("mustContainNumber");
      } else {
        if(validated.includes("mustContainNumber")) {
          validated.map((item,i)=> {
            if(item == "mustContainNumber") {
              validated.splice(i, 1);
            }
          })
        } 
      }
      if (atleast1SpecialCharacter.test(password) ) {
        validated.push("atleast1SpecialCharacter");
      } else {
        if(validated.includes("atleast1SpecialCharacter")) {
          validated.map((item,i)=> {
            if(item == "atleast1SpecialCharacter") {
              validated.splice(i, 1);
            }
          })
        } 
      }
      if (!identicalCharacter.test(password) ) {
        //validated.push("identicalCharacter");
      } else {
        if(validated.includes("identicalCharacter")) {
          validated.map((item,i)=> {
            if(item == "identicalCharacter") {
              validated.splice(i, 1);
            }
          })
        } 
      }

    }

    if(password.length < 10 && validated.length == 2) {
      return 'Weak'
    } else if(password.length >= 10 &&  validated.length == 3) {
      return 'Fair';
    } else if(password.length >= 10 &&  validated.length == 4) { 
      return 'Strong';
    } else {
      return 'Weak'
    }
	}
	
  render() {
    const { password } = this.props;
		const passwordLength = zxcvbn(password);
    return (
       <div className="password-strength-meter">
				 <progress
						className={`password-strength-meter-progress strength-${this.createPasswordLabel(passwordLength)}`}
						value={passwordLength.score}
						max="4"
					/>
        <br />
        <label
          className="password-strength-meter-label"
        >
          {password && (
            <>
              <strong>Password Strength:</strong> <span style={{color:'#4fa0a4'}}>{this.createPasswordLabel(passwordLength)}</span>
            </>
          )}
        </label>
      </div>
    );
  }
}

export default PasswordStrengthMeter;