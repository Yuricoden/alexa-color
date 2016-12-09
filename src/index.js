'use strict';

var AlexaSkill = require('./AlexaSkill');

var APP_ID = "amzn1.ask.skill.7aa0797e-4d68-4665-ab20-a719666230de";//replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';
var have_key = false;
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'SSML',
            ssml: '<speak>' + output + '</speak>',
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}



function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = "Let's go!" + waitinTime() + "Maybe you're trying to find something?"+ waitinTime();
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'any body here?';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createChosenColorAttributes(choosenColor) {
    return {
        choosenColor,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setColorInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const chosenColorSlot = intent.slots.Door;
    // const chosenActionSlot = intent.slots.Color;
    let repromptText = '';
    let counter = 0;
    let sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (chosenColorSlot) {
        const chosenColor = chosenColorSlot.value;
        sessionAttributes = createChosenColorAttributes(chosenColor);
        speechOutput = `You trying open ${chosenColor} door`;
        switch (chosenColor) {
            case 'red':
                if (have_key) {
                    speechOutput = "Congratulations, you win!";
                    // repromptText = "Congratulations, you win!";
                    have_key = false;
                    shouldEndSession = true;
                } else {
                    speechOutput = "Knock knock. Looks like the door is locked";
                    // repromptText = "Knock knock. Looks like the door is locked";
                }

                break;
            case 'green':
                if (have_key) {
                    speechOutput = "The green door opening... You look around and see nothing interesting";
                    // repromptText = "Knock knock. Looks like the door is locked";
                } else {
                    speechOutput = "The green door opening... You look around and see a small key";
                    // repromptText = "The green door opening... You look around and see a small key";
                }

                break;
            case 'blue':
                speechOutput = "Knock knock. Looks like the door is blocked";
                // repromptText = "Knock knock. Looks like the door is blocked";
                break;
            default:
                speechOutput = "We haven't door with this color";
                repromptText = "We haven't door with this color";
        }

    } else {
        speechOutput = "test";
        repromptText = "I'm not sure what your favorite color is";
    }

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function keyPutting(intent, session, callback) {
    let speechOutput = "";
    let repromptText = "";
    let shouldEndSession = false;
    const cardTitle = intent.name;
    const chosenColorSlot = intent.slots.Door;
    const sessionAttributes = {};
    have_key = true;
    speechOutput = "You pick up a key";
    repromptText = "You pick up a key";



    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}


function exitSkill(intent, session, callback) {
    let speechOutput = "";
    let repromptText = "";
    let shouldEndSession = true;
    have_key = false;
    const cardTitle = intent.name;
    const chosenColorSlot = intent.slots.Door;
    const sessionAttributes = {};
    speechOutput = "Exiting...";



    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}

function errorMessage(intent, session, callback) {
    let speechOutput = "test";
    let repromptText = "I'm not sure what your means";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}

// --------------- BODY -----------------------
function bodyLook(intent, session, callback) {
    let speechOutput = "It’s Trilby. He’s definitely dead. He’s wearing a silk dressing down over pajamas and slippers.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
// function bodyGet(intent, session, callback) {
//  let speechOutput = "Trilby was a big guy. He won’t fit in your inventory.";
//  let repromptText = "";
//  let shouldEndSession = false;
//  const sessionAttributes = '';
//  callback(sessionAttributes,
//          buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

// }

function bodyGet(intent, session, callback) {
    let speechOutput = "Trilby was a big guy. He won’t fit in your inventory.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}


function bodyAnalyze(intent, session, callback) {
    let speechOutput = "Trilby was a big man - over six feet tall. His comb-over is disheveled -- you knew he was secretly bald under that. He’s also been stabbed. There is a dagger high in his back. From the way the body facing, he may have been trying to get to the door. Next to his right hand is a crumpled piece of paper.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodySearch(intent, session, callback) {
    let speechOutput = "You shouldn’t touch the body before the police get here.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodyMourn(intent, session, callback) {
    let speechOutput = "Oh, woe! Alack! Fie!";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodyCallHelp(intent, session, callback) {
    let speechOutput = "That’s a good instinct. But do you want to look around first before everyone comes running?";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodyCallHelpConfirmationYes(intent, session, callback) {
    let speechOutput = "Good idea. Let’s keep looking.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodyCallHelpConfirmationNo(intent, session, callback) {
    let speechOutput = "OK." + waitinTime() + "This is a hint";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

}
function bodyRun(intent, session, callback) {
    let speechOutput = "You run, but not fast enough. The police catch you on the only road back to town, and everyone in the house points the finger at you. If only you had investigated more.";
    let repromptText = "";
    let shouldEndSession = false;
    const sessionAttributes = '';
    callback(sessionAttributes,
        buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}
function waitinTime() {
    var text = '<break time=\"10s\"/><break time=\"10s\"/><break time=\"10s\"/>';
    return text;
}

// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}



/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);
    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    // if (intentName === 'DoorSelect') {
    //     setColorInSession(intent, session, callback);
    // } else if (intentName === 'PuttingTheKey') {
    //     keyPutting(intent, session, callback);
    // } else if (intentName === 'ExitSkill') {
    //     exitSkill(intent, session, callback);
    // } else {
    //     errorMessage(callback);
    // }
    switch (intentName) {
        case 'BodyLook':
            bodyLook(intent, session, callback);
            break;
        case 'BodyGet':
            bodyGet(intent, session, callback);
            break;
        case 'BodyAnalyze':
            bodyAnalyze(intent, session, callback);
            break;
        case 'BodySearch':
            bodySearch(intent, session, callback);
            break;
        case 'BodyMourn':
            bodyMourn(intent, session, callback);
            break;
        case 'BodyCallHelp':
            bodyCallHelp(intent, session, callback);
            break;
        case 'BodyCallHelpConfirmationYes':
            bodyCallHelpConfirmationYes(intent, session, callback);
            break;
        case 'BodyCallHelpConfirmationNo':
            bodyCallHelpConfirmationNo(intent, session, callback);
            break;
        case 'BodyRun':
            bodyRun(intent, session, callback);
            break;
        default:
            errorMessage(callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
         if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
         callback('Invalid Application ID');
         }
         */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
