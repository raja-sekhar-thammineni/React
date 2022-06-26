import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../hooks";
import { toggle } from "../Reducers/Modal";
import Banner from "../Helpers/Banner";
import "./Form.css";

const formInfo = [
  {
    name: "Display Name",
    placeholder: "Please enter display name",
    type: "text",
    id: "Display_Name",
    value: "",
  },
  {
    name: "First Name",
    placeholder: "Please enter First name",
    type: "text",
    id: "First_Name",
    value: "",
  },
  {
    name: "Last Name",
    placeholder: "Please enter Last name",
    type: "text",
    id: "Last_Name",
    value: "",
  },
  {
    name: "About Yourself",
    placeholder: "Please enter About Yourself",
    type: "textarea",
    id: "About_Yourself",
    value: "",
  },
  {
    name: "Designer",
    placeholder: "Please enter About Yourself",
    type: "checkbox",
    id: "Designer",
    value: "Designer",
  },
  {
    name: "Developer",
    placeholder: "Please enter About Yourself",
    type: "checkbox",
    id: "Developer",
    value: "Developer",
  },
  {
    name: "Project Manager",
    placeholder: "Please enter About Yourself",
    type: "checkbox",
    id: "Project Manager",
    value: "Project Manager",
  },
  {
    name: "Sales",
    placeholder: "Please enter About Yourself",
    type: "checkbox",
    id: "Sales",
    value: "Sales",
  },
  {
    name: "Professional",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "Professional",
    value: "Professional",
    common: "Profession",
  },
  {
    name: "Student",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "Student",
    value: "Student",
    common: "Profession",
  },
  {
    name: "0-5",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "0-5",
    value: "0-5",
    common: "experience",
  },
  {
    name: "5-10",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "0-5",
    value: "5-10",
    common: "experience",
  },
  {
    name: "10 & Above",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "10 & Above",
    value: "10 & Above",
    common: "experience",
  },
  {
    name: "Java",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "Java",
    value: "Java",
    common: "expertise",
  },
  {
    name: "React",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "React",
    value: "React",
    common: "expertise",
  },
  {
    name: "Backend",
    placeholder: "Please enter About Yourself",
    type: "radio",
    id: "Backend",
    value: "Backend",
    common: "expertise",
  },
  {
    name: "Mention your role",
    placeholder: "Please enter About Yourself",
    type: "text",
    id: "Role",
    value: "",
  },
];

const Form = () => {
  const [profileInfo, setProfileInfo] = useState({
    Display_Name: "",
    First_Name: "",
    Last_Name: "",
    About_Yourself: "",
    Profession: "",
    experience: "",
    expertise: "",
    Role: "",
  });
  const [image, setImage] = useState("");
  const [valid, setValid] = useState(false);
  useEffect(() => {
    setValid(false);
    image &&
      Object.keys(profileInfo).length >= 9 &&
      profileInfo.About_Yourself &&
      profileInfo.Display_Name &&
      profileInfo.First_Name &&
      profileInfo.Last_Name &&
      profileInfo.Profession &&
      profileInfo.Role &&
      profileInfo.experience &&
      profileInfo.expertise &&
      setValid(true);
  }, [profileInfo, image]);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement[]>([]);
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const onSubmitHandlerForForm = () => {
    console.log(profileInfo);
    setProfileInfo({
      Display_Name: "",
      First_Name: "",
      Last_Name: "",
      About_Yourself: "",
      Profession: "",
      experience: "",
      expertise: "",
      Role: "",
    });
    dispatch(toggle("Your profile is saved!"));
    ref.current.forEach((item) =>
      item.checked ? (item.checked = false) : (item.value = "")
    );
    setImage("");
  };
  const refHandler = (event: any) => {
    event && !ref.current.includes(event) && ref.current.push(event);
  };
  const OnChangeHandlerToGetInput = ({
    target: { value, name, id, checked },
  }: never) => {
    if (checked) {
      setProfileInfo((pre) => {
        return {
          ...pre,
          [name]: id,
        };
      });
    } else {
      if (format.test(value)) {
        dispatch(toggle("* Error Message : Please enter Valid " + name));
      } else {
        setProfileInfo((pre) => {
          return {
            ...pre,
            [name]: value,
          };
        });
      }
    }
  };

  const setImageHandler = (e: any) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setImage(img);
  };
  return (
    <>
      <Banner header="My Profile" />
      <div className="form">
        <div className="form_left">
          {!image && (
            <input
              name="profile"
              id="profile"
              type="file"
              onChange={setImageHandler}
              placeholder="Upload profile pic"
            />
          )}
          {image && <img src={image} alt="profile" />}
        </div>
        <div className="form_right">
          <div className="firstRow">
            {formInfo.map(
              (item, index) =>
                index <= 2 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.id}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="secondrow">
            <p className="">About Yourself</p>
            <textarea
              id={formInfo[3].id}
              key={formInfo[3].name}
              placeholder={formInfo[3].placeholder}
              ref={refHandler}
              value={profileInfo.About_Yourself}
              name={formInfo[3].id}
              onChange={OnChangeHandlerToGetInput}
            />
          </div>
          <div className="thirdrow">
            <p className="">Your Area of Interest</p>
            {formInfo.map(
              (item, index) =>
                index >= 4 &&
                index <= 7 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.id}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="fourthrow">
            <p className="">Are you a student or Professional</p>
            {formInfo.map(
              (item, index) =>
                index >= 8 &&
                index <= 9 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.common}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="fifthrow">
            <p className="">How much of experience you have?</p>
            {formInfo.map(
              (item, index) =>
                index >= 10 &&
                index <= 12 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.common}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="sixthrow">
            <p className="">What is your expertise</p>
            {formInfo.map(
              (item, index) =>
                index >= 13 &&
                index <= 15 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.common}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="seventhdrow">
            {formInfo.map(
              (item, index) =>
                index === 16 && (
                  <div key={index} className="input">
                    <div>
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      <input
                        type={item.type}
                        name={item.id}
                        id={item.id}
                        placeholder={item.placeholder}
                        onChange={OnChangeHandlerToGetInput}
                        ref={refHandler}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="button">
            <button disabled={!valid} onClick={onSubmitHandlerForForm}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
