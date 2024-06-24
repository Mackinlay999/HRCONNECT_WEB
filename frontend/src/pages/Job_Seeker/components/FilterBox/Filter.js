import React from "react";
import filterStyle from "./Filterbox.module.css";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
function Filter({ handleOnChange, CbToggle }) {
  const { FilterOptions } = useSelector((state) => state.Filter);
  // checked= {FilterOptions?.name?.includes(value)}
  return (
    <div className={filterStyle.filterbox__mainContainer}>
      <aside className={filterStyle.filterBox}>
        <header className={filterStyle.filterBox__header}>
          Filter{" "}
          <RxCross2
            className={filterStyle.filterCloseButton}
            onClick={CbToggle}
          />
        </header>

        <form className={filterStyle.filterBox__formContainer}>

          <div className={filterStyle.filterBox__formGroup}>
            <h2 className={filterStyle.filterBox__formGroupHeader}>Job Type</h2>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobType"
                checked={FilterOptions["JobType"].includes("Full Time")}
                id="JobType1"
                value="Full Time"
              />
              <label
                htmlFor={"JobType1"}
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Full Time
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobType"
                checked={FilterOptions["JobType"].includes("Part Time")}
                id="JobType2"
                value="Part Time"
              />
              <label
                htmlFor={"JobType2"}
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Part Time
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobType"
                checked={FilterOptions["JobType"].includes("Remote")}
                id="JobType3"
                value="Remote"
              />
              <label
                htmlFor={"JobType3"}
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Remote
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobType"
                checked={FilterOptions["JobType"].includes("Internship")}
                id="JobType4"
                value="Internship"
              />
              <label
                htmlFor={"JobType4"}
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Internship
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobType"
                checked={FilterOptions["JobType"].includes("Contract")}
                id="JobType5"
                value="Contract"
              />
              <label
                htmlFor={"JobType5"}
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Contract
              </label>
            </div>
          </div>

          <div className={filterStyle.filterBox__formGroup}>
            <h2 className={filterStyle.filterBox__formGroupHeader}>
              Job Categories
            </h2>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Design")}
                id="JobCategory1"
                value="Design"
              />
              <label
                htmlFor="JobCategory1"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Design
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Sales")}
                id="JobCategory2"
                value="Sales"
              />
              <label
                htmlFor="JobCategory2"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Sales
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Marketing")}
                id="JobCategory3"
                value="Marketing"
              />
              <label
                htmlFor="JobCategory3"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Marketing
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Finance")}
                id="JobCategory4"
                value="Finance"
              />
              <label
                htmlFor="JobCategory4"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Finance
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Technology")}
                id="JobCategory5"
                value="Technology"
              />
              <label
                htmlFor="JobCategory5"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Technology
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Engineering")}
                id="JobCategory6"
                value="Engineering"
              />
              <label
                htmlFor="JobCategory6"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Engineering
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Business")}
                id="JobCategory7"
                value="Business"
              />
              <label
                htmlFor="JobCategory7"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Business
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobCategory"
                checked={FilterOptions["JobCategory"].includes("Human Resource")}
                id="JobCategory8"
                value="Human Resource"
              />
              <label
                htmlFor="JobCategory8"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Human Resource
              </label>
            </div>
          </div>

          <div className={filterStyle.filterBox__formGroup}>
            <h2 className={filterStyle.filterBox__formGroupHeader}>
              Job Level
            </h2>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobLevel"
                checked={FilterOptions["JobLevel"].includes("Entry Level")}
                id="JobLevel1"
                value="Entry Level"
              />
              <label
                htmlFor="JobLevel1"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Entry Level
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobLevel"
                checked={FilterOptions["JobLevel"].includes("Mid Level")}
                id="JobLevel2"
                value="Mid Level"
              />
              <label
                htmlFor="JobLevel2"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Mid Level
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobLevel"
                checked={FilterOptions["JobLevel"].includes("Senior Level")}
                id="JobLevel3"
                value="Senior Level"
              />
              <label
                htmlFor="JobLevel3"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Senior Level
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobLevel"
                checked={FilterOptions["JobLevel"].includes("Director")}
                id="JobLevel4"
                value="Director"
              />
              <label
                htmlFor="JobLevel4"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                Director
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="JobLevel"
                checked={FilterOptions["JobLevel"].includes("VP or above")}
                id="JobLevel5"
                value="VP or above"
              />
              <label
                htmlFor="JobLevel5"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                VP or above
              </label>
            </div>
          </div>

          <div className={filterStyle.filterBox__formGroup}>
            <h2 className={filterStyle.filterBox__formGroupHeader}>
              Salary Range
            </h2>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("2-3")}
                id="SalaryRange1"
                value="2-3"
              />
              <label
                htmlFor="SalaryRange1"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                2 - 3 LPA
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("3-5")}
                id="SalaryRange2"
                value="3-5"
              />
              <label
                htmlFor="SalaryRange2"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                3 - 5 LPA
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("5-7")}
                id="SalaryRange3"
                value="5-7"
              />
              <label
                htmlFor="SalaryRange3"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                5 - 7 LPA
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("7-9")}
                id="SalaryRange4"
                value="7-9"
              />
              <label
                htmlFor="SalaryRange4"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                7 - 9 LPA
              </label>
            </div>


            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("10-12")}
                id="SalaryRange5"
                value="10-12"
              />
              <label
                htmlFor="SalaryRange5"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                10 - 12 LPA
              </label>
            </div>

            <div className={filterStyle.filterBox__formGroupRow}>
              <input
                type="checkbox"
                onChange={handleOnChange}
                className={filterStyle.filterBox__formGroupRow_CheckBOX}
                name="SalaryRange"
                checked={FilterOptions["SalaryRange"].includes("15")}
                id="SalaryRange6"
                value="15"
              />
              <label
                htmlFor="SalaryRange6"
                className={filterStyle.filterBox__formGroupRow_Label}
              >
                15+ LPA
              </label>
            </div>
          </div>
          
        </form>
      </aside>
    </div>
  );
}

export default Filter;
