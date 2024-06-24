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

  const handleJobInfo = () => {
    const steps = [
      "step 1: Go to dashboard",
      "step 2: Select a job",
      "step 3: Apply for job",
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

  const handleEditProfile = () => {
    const steps = [
      "step 1: Go to Settings, at the bottom of left sidebar or you can directly click on edit profile button located at the bottom besides your profile pic",
      "step 2: Edit the field which you want to update",
      "step 3: At last click on save changes your profile will be updated",
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

  const handleUploadResume = () => {
    const steps = [
      "step 1: On the left sidebar click on My Resume.",
      "step 2: Then click on update your resume.",
      "step 3: Select your updated resume and upload it that's it it's done.",
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

  const handleApplicationStatus = () => {
    const steps = [
      "To check your application status",
      "step 1: In the left side bar click on application status.",
      "step 2: Here you can see all the status of your application",
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
            handleJobInfo,
            handleEditProfile,
            handleUploadResume,
            handleApplicationStatus
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
