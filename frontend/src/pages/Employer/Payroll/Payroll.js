import React from "react";
import { useState } from "react";
// react bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// style import
import PayrollStyle from "./Payroll.module.css";

// image imports
import payroll_outstanding_icon from "./image/outgoing.png";
import payroll_upcoming_icon from "./image/upcoming.png";
import withdraw_icon from "./image/withdraw.png";
import paypal_icon from "./image/paypal.png";
import tick from "./image/tick.png";
import user_img from "./image/Avatar.png";

// js data import
import Data from "./PayrollData";
import Details from "./WorkData";

// import Chart from "./Chart/AreaChart";
import MapOne from "./Chart/AreaChart";

// importing react icons
import { TiEye } from "react-icons/ti";
import { BsBagFill } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import MapTwo from "./Chart/FinanceChart";
import PieChartWithPaddingAngle from "./Chart/Piechart";
import PieChartWithPaddingAngleTow from "./Chart/SummaryChart";

export default function Payroll() {
  const [selectedRange, setSelectedRange] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedRange(event.target.value);
  };
  return (
    <section>
      <div className={PayrollStyle.payroll_section}>
        {/* first part */}
        <div className={PayrollStyle.payroll_outstanding_upcoming}>
          <Container>
            <Row>
              <Col xxl={7} xl={7} lg={7} md={7}>
                {Data.map((value, index) => (
                  <div
                    className={PayrollStyle.payroll_outstanding_upcoming}
                    key={index}
                  >
                    <div
                      className={
                        PayrollStyle.payroll_outstanding_upcoming_shell
                      }
                    >
                      {/* total outstanding */}
                      <div className={PayrollStyle.payroll_outstanding}>
                        <div className={PayrollStyle.payroll_outstanding_image}>
                          <img
                            src={payroll_outstanding_icon}
                            alt={"payroll_outstanding_icon"}
                            className={PayrollStyle.outstanding_image}
                          />
                        </div>
                        <div className={PayrollStyle.payroll_outstanding_title}>
                          <div className={PayrollStyle.outstanding_title}>
                            Total Outstanding
                          </div>
                          <div className={PayrollStyle.outstanding_money}>
                            ${value.TotalOutstanding}
                          </div>
                        </div>
                      </div>
                      {/* upcoming payment */}
                      <div className={PayrollStyle.upcoming_money}>
                        <div className={PayrollStyle.payroll_upcoming_image}>
                          <img
                            src={payroll_upcoming_icon}
                            alt={"payroll_upcoming_icon"}
                            className={PayrollStyle.upcoming_image}
                          />
                        </div>
                        <div className={PayrollStyle.payroll_upcoming_title}>
                          <div className={PayrollStyle.upcoming_title}>
                            Upcoming Payment
                          </div>
                          <div className={PayrollStyle.upcoming_date}>
                            April 1st, 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Col>
              {/* withdraw section full */}
              <Col xxl={5} xl={5} lg={5} md={5}>
                <div className={PayrollStyle.withdraw_section}>
                  <div className={PayrollStyle.withdraw_title_icon}>
                    <div className={PayrollStyle.withdraw_title}>
                      Withdraw Method
                    </div>
                    <div className={PayrollStyle.withdraw_icon}>
                      <img
                        src={withdraw_icon}
                        alt={"withdraw_icon"}
                        className={PayrollStyle.withdraw_image}
                      />
                    </div>
                  </div>
                  <div className={PayrollStyle.withdraw_paypal}>
                    <div className={PayrollStyle.withdraw_paypal_icon}>
                      <div className={PayrollStyle.paypal_icon}>
                        <img
                          src={paypal_icon}
                          alt={"paypal_icon"}
                          className={PayrollStyle.paypal_image}
                        />
                      </div>
                      <div className={PayrollStyle.paypal_verified}>
                        <div className={PayrollStyle.paypal_title}>PayPal</div>
                        <div className={PayrollStyle.paypal_verified_title}>
                          Verified
                        </div>
                      </div>
                    </div>

                    <button className={PayrollStyle.paypal_verified_button}>
                      <div className={PayrollStyle.paypal_verified_tick}>
                        <img
                          src={tick}
                          alt={"tick"}
                          className={PayrollStyle.paypal_tick_image}
                        />

                        <span
                          className={PayrollStyle.paypal_verified_connected}
                        >
                          Connected
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* first part over */}
        {/* second part start */}
        <div className={PayrollStyle.paypal_area_chart_full}>
          <div className={PayrollStyle.paypal_area_chart}>
            <Container>
              <Row>
                <Col xxl={7} xl={7} lg={7} md={7}>
                  {Data.map((pay, index) => (
                    <div className={PayrollStyle.area_chart_style_prop}>
                      <div
                        className={PayrollStyle.paypal_area_chart_title}
                        key={index}
                      >
                        <div className={PayrollStyle.area_chart_title}>
                          Payment History
                          <div className={PayrollStyle.area_chart_payment}>
                            ${pay.PaymentHistory}
                          </div>
                          <div
                            className={
                              PayrollStyle.area_chart_pay_per_month_style
                            }
                          >
                            <div className={PayrollStyle.area_chart_pay_per}>
                              +12%
                            </div>
                            <div
                              className={PayrollStyle.area_chart_pay_per_month}
                            >
                              vs last month
                            </div>
                          </div>
                        </div>
                        <div className={PayrollStyle.area_chart_pay_per_time}>
                          <div className={PayrollStyle.area_chart_pay_time_box}>
                            <ul className={PayrollStyle.area_time_box}>
                              <li className={PayrollStyle.date_month}>1M</li>
                              <li className={PayrollStyle.date_month}>3M</li>
                              <li className={PayrollStyle.date_month}>6M</li>
                              <li className={PayrollStyle.date_month}>1Y</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className={PayrollStyle.graph_one}>
                        <MapOne />
                      </div>
                    </div>
                  ))}
                </Col>
                <Col xxl={5} xl={5} lg={5} md={5}>
                  <div className={PayrollStyle.payment_history_title_title}>
                    <div className={PayrollStyle.payment_history}>
                      <div className={PayrollStyle.payment_history_title}>
                        <div className={PayrollStyle.history_title}>
                          Payment History
                        </div>
                        <div className={PayrollStyle.payment_history_all}>
                          See All
                        </div>
                      </div>
                    </div>
                    {Details.map((item, index) => (
                      <div
                        className={PayrollStyle.payment_history_person_flex}
                        key={index}
                      >
                        <div className={PayrollStyle.payment_history_person}>
                          <div className={PayrollStyle.payment_history_user}>
                            <img
                              src={user_img}
                              alt={"user_img"}
                              className={PayrollStyle.user_image}
                            />
                            <div className={PayrollStyle.history_user_name}>
                              {item.Name}
                              <div className={PayrollStyle.history_user_role}>
                                {item.Role}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={PayrollStyle.history_money}>
                          ${item.Pay}
                          <div className={PayrollStyle.history_money_date}>
                            1 Jun 2024
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        {/* second part start over */}

        {/* third part starts  */}
        <div className={PayrollStyle.paypal_area_chart_full}>
          <div className={PayrollStyle.paypal_area_chart}>
            <Container>
              <Row>
                <Col xxl={7} xl={7} lg={7} md={7}>
                  {Data.map((pay, index) => (
                    <div
                      className={PayrollStyle.paypal_area_chart_title}
                      key={index}
                    >
                      <div className={PayrollStyle.area_chart_title}>
                        Total Outstanding
                        <div className={PayrollStyle.area_chart_payment}>
                          ${pay.PaymentHistory}
                        </div>
                      </div>
                      <div className={PayrollStyle.area_chart_pay_per_time}>
                        <div className={PayrollStyle.area_chart_pay_time_box}>
                          <ul className={PayrollStyle.area_time_box}>
                            <li className={PayrollStyle.date_month}>1M</li>
                            <li className={PayrollStyle.date_month}>3M</li>
                            <li className={PayrollStyle.date_month}>6M</li>
                            <li className={PayrollStyle.date_month}>1Y</li>
                          </ul>
                        </div>
                        <div className={PayrollStyle.outstanding_pay_roll}>
                          <div
                            className={PayrollStyle.outstanding_pay_roll_per}
                          >
                            +12%
                          </div>
                          <div
                            className={
                              PayrollStyle.outstanding_pay_roll_per_person
                            }
                          >
                            vs last month
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={PayrollStyle.chart_two}>
                    <MapTwo />
                  </div>
                </Col>
                <Col xxl={5} xl={5} lg={5} md={5}>
                  <div
                    className={PayrollStyle.payment_history_title_title_summary}
                  >
                    <div className={PayrollStyle.payment_history}>
                      <div className={PayrollStyle.payment_history_title}>
                        <div className={PayrollStyle.history_title}>
                          Payment Summary
                          <div className={PayrollStyle.history_pay_date}>
                            From 1 - 31 March, 2024
                          </div>
                        </div>
                        <div className={PayrollStyle.payment_history_all}>
                          View Report
                        </div>
                      </div>

                      <div className={PayrollStyle.payment_pending_paid}>
                        <div className={PayrollStyle.payment_all}>
                          <div className={PayrollStyle.payment_title}>
                            Payment
                            <div className={PayrollStyle.payment_amount_all}>
                              $18134
                            </div>
                          </div>
                        </div>

                        <div className={PayrollStyle.pending_all}>
                          <div className={PayrollStyle.Pending_title}>
                            Pending
                            <div className={PayrollStyle.Pending_amount_all}>
                              $3714
                            </div>
                          </div>
                        </div>

                        <div className={PayrollStyle.paid_all}>
                          <div className={PayrollStyle.paid_title}>
                            Paid
                            <div className={PayrollStyle.paid_amount_all}>
                              $23420
                            </div>
                          </div>
                        </div>
                      </div>
                      <PieChartWithPaddingAngle />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        {/* third part starts over  */}
        {/* fourth part starts */}
        <Container>
          <Row>
            <Col xxl={7} xl={7} lg={8} md={8}>
              <div className={PayrollStyle.payment_history_title_title}>
                <div className={PayrollStyle.payment_history}>
                  <div className={PayrollStyle.payment_history_title}>
                    <div className={PayrollStyle.history_title}>
                      Payment History
                    </div>
                    <div className={PayrollStyle.payment_history_all}>
                      See All
                    </div>
                  </div>
                </div>
                {Details.map((item, index) => (
                  <div
                    className={PayrollStyle.payment_history_person_flex}
                    key={index}
                  >
                    <div className={PayrollStyle.payment_history_person_person}>
                      <div className={PayrollStyle.payment_history_user}>
                        <img
                          src={user_img}
                          alt={"user_img"}
                          className={PayrollStyle.user_image_two}
                        />
                        <div className={PayrollStyle.history_user_name}>
                          {item.Name}
                          <div className={PayrollStyle.history_user_role}>
                            {item.Role}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={PayrollStyle.history_money_date}>
                      Mar 1, 2024
                      <div className={PayrollStyle.history_money_date_time}>
                        08 : 00 AM
                      </div>
                    </div>
                    <div className={PayrollStyle.history_money_off}>
                      ${item.Pay}
                      <div className={PayrollStyle.history_money_date_off}>
                        1 Jun 2024
                      </div>
                    </div>

                    <div className={PayrollStyle.history_money_off_button}>
                      <button
                        className={PayrollStyle.history_money_off_button_button}
                      >
                        <BsBagFill /> Send Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xxl={5} xl={5} lg={4} md={4}>
              <div
                className={PayrollStyle.payroll_outstanding_upcoming_shell_two}
              >
                <div className={PayrollStyle.payroll_outstanding}>
                  <div className={PayrollStyle.payroll_outstanding_image}>
                    <img
                      src={payroll_outstanding_icon}
                      alt={"payroll_outstanding_icon"}
                      className={PayrollStyle.outstanding_image_two}
                    />
                  </div>
                  <div className={PayrollStyle.payroll_outstanding_title}>
                    <div className={PayrollStyle.outstanding_title_two}>
                      Previous Payments
                    </div>
                    <div className={PayrollStyle.outstanding_title}>
                      $58764.98
                    </div>
                  </div>
                </div>

                <div className={PayrollStyle.outstanding_title_paid}>
                  March 1,2024
                  <div className={PayrollStyle.outstanding_title_paid_button}>
                    <BsDot className={PayrollStyle.dot} /> PAID
                  </div>
                </div>
              </div>
              <div className={PayrollStyle.payroll_inner_shell}>
                <div
                  className={
                    PayrollStyle.payroll_outstanding_upcoming_shell_two_up
                  }
                >
                  <div className={PayrollStyle.payroll_outstanding}>
                    <div className={PayrollStyle.payroll_outstanding_image}>
                      <img
                        src={payroll_upcoming_icon}
                        alt={"payroll_upcoming_icon"}
                        className={PayrollStyle.outstanding_image_two}
                      />
                    </div>
                    <div className={PayrollStyle.payroll_outstanding_title}>
                      <div className={PayrollStyle.outstanding_title_two}>
                        Upcoming Payroll
                      </div>
                      <div className={PayrollStyle.outstanding_title}>
                        $2764.98
                      </div>
                    </div>
                  </div>

                  <div className={PayrollStyle.outstanding_title_paid}>
                    April 1,2024
                    <div
                      className={PayrollStyle.outstanding_title_pending_button}
                    >
                      <BsDot className={PayrollStyle.dot} /> PENDING
                    </div>
                  </div>
                </div>
                <div className={PayrollStyle.employee_details_main}>
                  <div className={PayrollStyle.user_payslip_full_full}>
                    Employee
                    <div className={PayrollStyle.user_payslip_full}>
                      <div className={PayrollStyle.payment_history_user}>
                        <img
                          src={user_img}
                          alt={"user_img"}
                          className={PayrollStyle.user_image}
                        />
                        <div className={PayrollStyle.history_user_name}>
                          Cody Fisher
                          <div className={PayrollStyle.history_user_role}>
                            Dell Inc
                          </div>
                        </div>
                      </div>
                      <button className={PayrollStyle.user_payslip}>
                        Send Payslip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* fourth part ends  */}

        <div className={PayrollStyle.three_modal_box_full}>
          <Container>
            <Row>
              <Col xxl={4} xl={4} lg={4} md={4}>
                {/* fifth part starts here */}
                <div className={PayrollStyle.three_modal_box}>
                  {/* first box */}
                  <div className={PayrollStyle.blue_box}>
                    <div className={PayrollStyle.blue_box_title}>
                      Upcoming
                      <div className={PayrollStyle.blue_box_date}>
                        April 1st, 2024
                      </div>
                    </div>
                    <div className={PayrollStyle.blue_box_date_calender}>
                      <SlCalender
                        className={PayrollStyle.blue_box_date_image}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xxl={4} xl={4} lg={4} md={4}>
                <div className={PayrollStyle.three_modal_box}>
                  {/* first box */}
                  <div className={PayrollStyle.white_box}>
                    <div className={PayrollStyle.white_box_title}>
                      Total Outstanding
                      <div className={PayrollStyle.white_box_date}>
                        $58764.25
                      </div>
                    </div>
                    <div className={PayrollStyle.blue_box_date_calender}>
                      <img
                        src={payroll_outstanding_icon}
                        alt={"payroll_outstanding_icon"}
                        className={PayrollStyle.outstanding_image_clone}
                      />
                    </div>
                  </div>
                </div>
              </Col>

              <Col xxl={4} xl={4} lg={4} md={4}>
                <div className={PayrollStyle.withdraw_section}>
                  <div className={PayrollStyle.withdraw_title_icon}>
                    <div className={PayrollStyle.withdraw_title}>
                      Withdraw Method
                    </div>
                    <div className={PayrollStyle.withdraw_icon}>
                      <img
                        src={withdraw_icon}
                        alt={"withdraw_icon"}
                        className={PayrollStyle.withdraw_image}
                      />
                    </div>
                  </div>
                  <div className={PayrollStyle.withdraw_paypal}>
                    <div className={PayrollStyle.withdraw_paypal_icon}>
                      <div className={PayrollStyle.paypal_icon}>
                        <img
                          src={paypal_icon}
                          alt={"paypal_icon"}
                          className={PayrollStyle.paypal_image}
                        />
                      </div>
                      <div className={PayrollStyle.paypal_verified}>
                        <div className={PayrollStyle.paypal_title}>PayPal</div>
                        <div className={PayrollStyle.paypal_verified_title}>
                          Verified
                        </div>
                      </div>
                    </div>

                    <button className={PayrollStyle.paypal_verified_button}>
                      <div className={PayrollStyle.paypal_verified_tick}>
                        <img
                          src={tick}
                          alt={"tick"}
                          className={PayrollStyle.paypal_tick_image}
                        />

                        <span
                          className={PayrollStyle.paypal_verified_connected}
                        >
                          Connected
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          {/* fifth part starts ends here */}

          {/* last part starts here */}

          <Container>
            <Row>
              <Col xxl={8} xl={8} lg={8} md={8}>
                <div className={PayrollStyle.summary_last_full}>
                  <div className={PayrollStyle.summary_last}>
                    <div className={PayrollStyle.summary_title}>
                      Payroll Summary
                      <div className={PayrollStyle.summary_title_date}>
                        From 1 - 31 March 2024
                      </div>
                    </div>
                    <div className={PayrollStyle.summary_dropdown}>
                      <select
                        id="timeRange"
                        value={selectedRange}
                        onChange={handleDropdownChange}
                        className={PayrollStyle.summary_dropdown_list}
                      >
                        <option value="last30days">Last 30 days</option>
                        <option value="last1month">Last 1 month</option>
                      </select>
                    </div>
                  </div>
                  <div className={PayrollStyle.summary_chart}>
                    <PieChartWithPaddingAngleTow />

                    <div className={PayrollStyle.summary_chart_color_scheme}>
                      <div className={PayrollStyle.payment_pending_paid}>
                        <div className={PayrollStyle.payment_all}>
                          <div className={PayrollStyle.payment_title_dark}>
                            Payment
                            <div className={PayrollStyle.payment_amount_all}>
                              $18134
                            </div>
                          </div>
                        </div>

                        <div className={PayrollStyle.pending_all}>
                          <div className={PayrollStyle.Pending_title_blue}>
                            Payment
                            <div className={PayrollStyle.Pending_amount_all}>
                              $3714
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={PayrollStyle.payment_pending_paid}>
                        <div className={PayrollStyle.payment_all}>
                          <div className={PayrollStyle.payment_title_orange}>
                            Payment
                            <div className={PayrollStyle.payment_amount_all}>
                              $18134
                            </div>
                          </div>
                        </div>

                        <div className={PayrollStyle.pending_all}>
                          <div className={PayrollStyle.Pending_title_darkblue}>
                            Payment
                            <div className={PayrollStyle.Pending_amount_all}>
                              $3714
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className={PayrollStyle.view}>
                    <TiEye /> View Transaction
                  </button>
                </div>
              </Col>
              <Col xxl={4} xl={4} lg={4} md={4}>
                <div className={PayrollStyle.payment_history_title_title_last}>
                  <div className={PayrollStyle.payment_history}>
                    <div className={PayrollStyle.payment_history_title}>
                      <div className={PayrollStyle.history_title}>
                        Transaction History
                      </div>
                      <div className={PayrollStyle.payment_history_all}>
                        See All
                      </div>
                    </div>
                  </div>
                  {Details.map((item, index) => (
                    <div
                      className={PayrollStyle.payment_history_person_flex}
                      key={index}
                    >
                      <div className={PayrollStyle.payment_history_person}>
                        <div className={PayrollStyle.payment_history_user}>
                          <img
                            src={user_img}
                            alt={"user_img"}
                            className={PayrollStyle.user_image}
                          />
                          <div className={PayrollStyle.history_user_name}>
                            {item.Name}
                            <div className={PayrollStyle.history_user_role}>
                              {item.Role}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={PayrollStyle.history_money}>
                        ${item.Pay}
                        <div className={PayrollStyle.history_money_date}>
                          1 Jun 2024
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
          {/* last part ends here */}
        </div>
      </div>
    </section>
  );
}
