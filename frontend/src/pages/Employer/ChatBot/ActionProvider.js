import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleReject = ()=>{
    const botMessage = createChatBotMessage("please ask the question related to job, or you might have typo in your message")
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handlePostInfo = () => {
    const steps = [
      "step 1: Go to create post",
      "step 2: Upload your post image and fill the required details.",
      "step 3: Pre-assessment is optional, If you want you can add questions also.",
      "step 4: Last but not least click on save and preview to preview all filled details.",
      "step 5: Click on post.",
      "step 6: Check the dashboard for your post."
    ];

    // Iterate through each step and send it as a separate message
    steps.forEach((step, index) => {
      // Delay sending each step by a certain interval (e.g., 1000ms * index)
      setTimeout(() => {
        const botMessage = createChatBotMessage(step);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      }, 1000 * index); // Delay each step by 1 second
    });
  };

  const handleAnalytics = () => {
    const steps = [
        "The analytics section will show your report of daily sent email in the form of bar chart.",
        "It will also show you to which gender you have sent email which will be divided into percentage shown by pie chart."
    ];

    // Iterate through each step and send it as a separate message
    steps.forEach((step, index) => {
      // Delay sending each step by a certain interval (e.g., 1000ms * index)
      setTimeout(() => {
        const botMessage = createChatBotMessage(step);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      }, 1000 * index); // Delay each step by 1 second
    });
  };

  const handleScheduleInterview = () => {
    const steps = [
      "step 1: On the left sidebar click on interview scheduled tab.",
      "step 2: Then click on schedule interview.",
      "step 3: All details of the candidate will be shown.",
      "step 4: Fill the relevant part of form.",
      "step 5: At last schedule the candidate interview."
    ];

    // Iterate through each step and send it as a separate message
    steps.forEach((step, index) => {
      // Delay sending each step by a certain interval (e.g., 1000ms * index)
      setTimeout(() => {
        const botMessage = createChatBotMessage(step);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      }, 1000 * index); // Delay each step by 1 second
    });
  };

  const handleDeletePost = () => {
    const steps = [
      "Go to dashboard",
      "step 1: scroll down to latest post section.",
      "step 2: In latest post at top right you will see the delete icon.",
      "step 3: click on it and the post will be deleted."
    ];

    // Iterate through each step and send it as a separate message
    steps.forEach((step, index) => {
      // Delay sending each step by a certain interval (e.g., 1000ms * index)
      setTimeout(() => {
        const botMessage = createChatBotMessage(step);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      }, 1000 * index); // Delay each step by 1 second
    });
  };



  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleReject,
            handlePostInfo,
            handleAnalytics,
            handleScheduleInterview,
            handleDeletePost
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
