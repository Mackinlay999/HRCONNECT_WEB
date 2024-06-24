import { MdKeyboardArrowLeft } from "react-icons/md";
import assessmentStyle from "./Assessment.module.css";
import { IoStar } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate, useLocation, Link } from "react-router-dom";
function InstructionPage() {
  const { state } = useLocation();
  const navigateTO = useNavigate();

  return (
    <div className={assessmentStyle.AssessmentPage__InstructionContainer}>
      <header className={assessmentStyle.InstructionContainer__Heading_Box}>
        <MdKeyboardArrowLeft
          className={assessmentStyle.InstructionPage_buttonICON}
          onClick={() => navigateTO(-1)}
        />
        <h1 className={assessmentStyle.PrimaryHeadingbox__headingText}>
          Instruction
        </h1>
      </header>

      <div
        className={`${assessmentStyle.InstructionContainer__Heading_Box} ${assessmentStyle.InstructionContainer__SecondaryHeading_Box}`}
      >
        <p className={assessmentStyle.secondaryHeading__Textbox}>
          <span className={assessmentStyle.Instruction__Textbox_PrimaryText}>
            {state.name}
          </span>
          <span className={assessmentStyle.Instruction__Textbox_SecondarryText}>
            get 100 points
          </span>
        </p>

        <p className={assessmentStyle.secondaryHeading__Starbox}>
          <span>{state.rating}</span>{" "}
          <IoStar
            className={assessmentStyle.InstructionPage__assessment_starICON}
          />
        </p>
      </div>

      <div className={assessmentStyle.InstructionContainer__whiteBox}>
        <ul className={assessmentStyle.InstructionContainer__InstructionLIST}>
          <h3
            className={
              assessmentStyle.InstructionContainer__InstructionLIST__Title
            }
          >
            Brief explanation about this quiz
          </h3>

          <li className={assessmentStyle.InstructionLIST_Item}>
            <span className={assessmentStyle.InstructionLIST_itemICON_Box}>
              <FiFileText
                className={assessmentStyle.InstructionLIST_itemICON}
              />
            </span>

            <p className={assessmentStyle.InstructionLIST_Item_TextBox}>
              <span
                className={assessmentStyle.InstructionLIST_Item_TextBox_primary}
              >
                {state.question} Question
              </span>
              <span
                className={
                  assessmentStyle.InstructionLIST_Item_TextBox_secondary
                }
              >
                10 point for a correct answere
              </span>
            </p>
          </li>

          <li className={assessmentStyle.InstructionLIST_Item}>
            <span className={assessmentStyle.InstructionLIST_itemICON_Box}>
              <FaRegClock
                className={assessmentStyle.InstructionLIST_itemICON}
              />
            </span>

            <p className={assessmentStyle.InstructionLIST_Item_TextBox}>
              <span
                className={assessmentStyle.InstructionLIST_Item_TextBox_primary}
              >
                {state.time}
              </span>
              <span
                className={
                  assessmentStyle.InstructionLIST_Item_TextBox_secondary
                }
              >
                Total duration of the quiz
              </span>
            </p>
          </li>

          <li className={assessmentStyle.InstructionLIST_Item}>
            <span className={assessmentStyle.InstructionLIST_itemICON_Box}>
              <IoMdStarOutline
                className={assessmentStyle.InstructionLIST_itemICON}
              />
            </span>

            <p className={assessmentStyle.InstructionLIST_Item_TextBox}>
              <span
                className={assessmentStyle.InstructionLIST_Item_TextBox_primary}
              >
                Win {state.star} star
              </span>
              <span
                className={
                  assessmentStyle.InstructionLIST_Item_TextBox_secondary
                }
              >
                Answere all the question correctly
              </span>
            </p>
          </li>
        </ul>

        <ul
          className={`${assessmentStyle.InstructionContainer__InstructionLIST} ${assessmentStyle.InstructionContainer__Second_InstructionLIST}`}
        >
          <h3 className={`${assessmentStyle.InstructionContainer__InstructionLIST__Title} ${assessmentStyle.InstructionContainer__Second_InstructionLIST__Title}`}>
            Please read the text below carefully so you can understand it...
          </h3>

          <li
            className={`${assessmentStyle.InstructionLIST_Item} ${assessmentStyle.Second_InstructionList_ITEM}`}
          >
            <span
              className={assessmentStyle.Second_InstructionLIST_itemICON_Box}
            ></span>
            <p className={assessmentStyle.Second_InstructionLIST_Item_TextBox}>
              10 point awarded for a correct answer and no marks for a incorrect
              answer
            </p>
          </li>

          <li
            className={`${assessmentStyle.InstructionLIST_Item} ${assessmentStyle.Second_InstructionList_ITEM}`}
          >
            <span
              className={assessmentStyle.Second_InstructionLIST_itemICON_Box}
            ></span>

            <p className={assessmentStyle.Second_InstructionLIST_Item_TextBox}>
              Tap on options to select the correct answer
            </p>
          </li>

          <li
            className={`${assessmentStyle.InstructionLIST_Item} ${assessmentStyle.Second_InstructionList_ITEM}`}
          >
            <span
              className={assessmentStyle.Second_InstructionLIST_itemICON_Box}
            ></span>

            <p className={assessmentStyle.Second_InstructionLIST_Item_TextBox}>
              Don't Close the Full screen mode untill you finish the test
            </p>
          </li>

          <li
            className={`${assessmentStyle.InstructionLIST_Item} ${assessmentStyle.Second_InstructionList_ITEM}`}
          >
            <span
              className={assessmentStyle.Second_InstructionLIST_itemICON_Box}
            ></span>

            <p className={assessmentStyle.Second_InstructionLIST_Item_TextBox}>
              Don't realod the page or change the tab during assessment
            </p>
          </li>

          <li
            className={`${assessmentStyle.InstructionLIST_Item} ${assessmentStyle.Second_InstructionList_ITEM}`}
          >
            <span
              className={assessmentStyle.Second_InstructionLIST_itemICON_Box}
            ></span>

            <p className={assessmentStyle.Second_InstructionLIST_Item_TextBox}>
              Click submit if you are sure you want to complete all the quiz
            </p>
          </li>
        </ul>

        <div
          className={
            assessmentStyle.InstructionContainer__whiteBox__buttonContainer
          }
        >
          <Link
            to={"/assessment-test"}
            className={assessmentStyle.StartQuizButton}
            state={{ id: state._id, time: state.time, name: state.name }}
          >
            Start Quiz{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;
