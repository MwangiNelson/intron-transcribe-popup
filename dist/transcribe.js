function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { useState, useEffect, useRef } from "react";
import 'transcribe.css';
export default function AudioRecorder() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isRecording = _useState2[0],
    setIsRecording = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isStartEnabled = _useState4[0],
    setIsStartEnabled = _useState4[1];
  var _useState5 = useState("The quick brown fox jumps over the lazy dog."),
    _useState6 = _slicedToArray(_useState5, 2),
    currentSentence = _useState6[0],
    setCurrentSentence = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    recordingTime = _useState8[0],
    setRecordingTime = _useState8[1];
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    recordings = _useState10[0],
    setRecordings = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    currentlyPlaying = _useState12[0],
    setCurrentlyPlaying = _useState12[1];
  var timerRef = useRef(null);
  var audioRef = useRef(null);
  useEffect(function () {
    return function () {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  var startRecording = function startRecording() {
    console.log("Starting recording...");
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(function () {
      setRecordingTime(function (prevTime) {
        return prevTime + 1;
      });
    }, 1000);
  };
  var stopRecording = function stopRecording() {
    console.log("Stopping recording...");
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Simulating a recorded blob
    var newRecording = {
      id: Date.now(),
      duration: recordingTime,
      blob: new Blob(["Simulated audio data"], {
        type: "audio/webm"
      })
    };
    setRecordings(function (prevRecordings) {
      return [].concat(_toConsumableArray(prevRecordings), [newRecording]);
    });
  };
  var clearRecording = function clearRecording() {
    console.log("Clearing/restarting recording...");
    if (isRecording) {
      stopRecording();
    }
    setRecordingTime(0);
  };
  var skipSentence = function skipSentence() {
    console.log("Skipping to next sentence...");
    setCurrentSentence("This is a new sentence to read aloud.");
    if (isRecording) {
      stopRecording();
    }
  };
  var formatTime = function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return "".concat(mins.toString().padStart(2, "0"), ":").concat(secs.toString().padStart(2, "0"));
  };
  var playRecording = function playRecording(id) {
    var recording = recordings.find(function (r) {
      return r.id === id;
    });
    if (recording) {
      if (currentlyPlaying === id) {
        var _audioRef$current;
        (_audioRef$current = audioRef.current) === null || _audioRef$current === void 0 || _audioRef$current.pause();
        setCurrentlyPlaying(null);
      } else {
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(recording.blob);
          audioRef.current.play();
          setCurrentlyPlaying(id);
        }
      }
    }
  };
  var deleteRecording = function deleteRecording(id) {
    setRecordings(function (prevRecordings) {
      return prevRecordings.filter(function (r) {
        return r.id !== id;
      });
    });
    if (currentlyPlaying === id) {
      var _audioRef$current2;
      (_audioRef$current2 = audioRef.current) === null || _audioRef$current2 === void 0 || _audioRef$current2.pause();
      setCurrentlyPlaying(null);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "card-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "110.412",
    height: "34.73",
    viewBox: "0 0 110.412 34.73"
  }, /*#__PURE__*/React.createElement("g", {
    id: "Group_26",
    "data-name": "Group 26",
    transform: "translate(-56.928 -70.028)"
  }, /*#__PURE__*/React.createElement("path", {
    id: "Path_27",
    "data-name": "Path 27",
    d: "M6.291-15.981V-1.375H1.924V-15.981Zm.507-4A2.308,2.308,0,0,1,6.586-19a2.577,2.577,0,0,1-.577.8,2.827,2.827,0,0,1-.852.549,2.644,2.644,0,0,1-1.035.2,2.458,2.458,0,0,1-1-.2A2.811,2.811,0,0,1,2.3-18.2a2.535,2.535,0,0,1-.563-.8,2.375,2.375,0,0,1-.2-.979,2.458,2.458,0,0,1,.2-1A2.6,2.6,0,0,1,2.3-21.8a2.638,2.638,0,0,1,.824-.549,2.534,2.534,0,0,1,1-.2,2.727,2.727,0,0,1,1.035.2,2.659,2.659,0,0,1,.852.549,2.636,2.636,0,0,1,.577.817A2.388,2.388,0,0,1,6.8-19.982Z",
    transform: "translate(90.466 92.573)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_28",
    "data-name": "Path 28",
    d: "M1.8-.964V-15.57H4.5a1.205,1.205,0,0,1,.683.183.978.978,0,0,1,.387.549l.254.845a10.608,10.608,0,0,1,.873-.732,5.114,5.114,0,0,1,.965-.57,5.727,5.727,0,0,1,1.113-.366,5.971,5.971,0,0,1,1.3-.134,5.114,5.114,0,0,1,2.12.416,4.4,4.4,0,0,1,1.556,1.155,4.985,4.985,0,0,1,.958,1.761,7.3,7.3,0,0,1,.324,2.218V-.964H10.673v-9.282a2.554,2.554,0,0,0-.493-1.669,1.771,1.771,0,0,0-1.451-.6,3.038,3.038,0,0,0-1.352.31,5.258,5.258,0,0,0-1.211.831V-.964Z",
    transform: "translate(98.045 92.162)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_29",
    "data-name": "Path 29",
    d: "M6.848-1A5.149,5.149,0,0,1,5.01-1.3a3.651,3.651,0,0,1-1.338-.859,3.663,3.663,0,0,1-.824-1.345,5.207,5.207,0,0,1-.282-1.761v-7.55H1.327a.827.827,0,0,1-.577-.218.824.824,0,0,1-.239-.641v-1.7l2.324-.451.859-3.563a.868.868,0,0,1,.958-.676H6.933V-15.8h3.549v2.986H6.933v7.254a1.365,1.365,0,0,0,.246.838.833.833,0,0,0,.711.331,1.4,1.4,0,0,0,.4-.049,1.6,1.6,0,0,0,.282-.113q.12-.063.225-.113a.577.577,0,0,1,.246-.049.508.508,0,0,1,.317.092,1.134,1.134,0,0,1,.246.289l1.324,2.07a6.026,6.026,0,0,1-1.9.951A7.556,7.556,0,0,1,6.848-1Z",
    transform: "translate(114.174 92.422)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_30",
    "data-name": "Path 30",
    d: "M1.8-.967V-15.573H4.392a2.21,2.21,0,0,1,.542.056.951.951,0,0,1,.366.176.751.751,0,0,1,.225.317,2.858,2.858,0,0,1,.134.479L5.9-13.179a7.158,7.158,0,0,1,1.8-1.958,3.663,3.663,0,0,1,2.183-.718,2.515,2.515,0,0,1,1.606.479l-.563,3.211a.627.627,0,0,1-.225.416.765.765,0,0,1-.451.12,2.989,2.989,0,0,1-.563-.063,4.367,4.367,0,0,0-.817-.063,3,3,0,0,0-2.7,1.831V-.967Z",
    transform: "translate(124.986 92.165)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_31",
    "data-name": "Path 31",
    d: "M8.243-15.8a8.436,8.436,0,0,1,3.028.521,6.642,6.642,0,0,1,2.345,1.493,6.725,6.725,0,0,1,1.521,2.359A8.511,8.511,0,0,1,15.68-8.3a8.665,8.665,0,0,1-.542,3.148,6.772,6.772,0,0,1-1.521,2.38,6.674,6.674,0,0,1-2.345,1.507,8.335,8.335,0,0,1-3.028.528,8.433,8.433,0,0,1-3.049-.528A6.8,6.8,0,0,1,2.828-2.774a6.674,6.674,0,0,1-1.535-2.38A8.665,8.665,0,0,1,.75-8.3a8.511,8.511,0,0,1,.542-3.12,6.628,6.628,0,0,1,1.535-2.359,6.773,6.773,0,0,1,2.366-1.493A8.535,8.535,0,0,1,8.243-15.8Zm0,11.817a2.48,2.48,0,0,0,2.218-1.063,5.881,5.881,0,0,0,.711-3.232,5.844,5.844,0,0,0-.711-3.225,2.485,2.485,0,0,0-2.218-1.056A2.547,2.547,0,0,0,5.976-11.5a5.8,5.8,0,0,0-.718,3.225,5.835,5.835,0,0,0,.718,3.232A2.541,2.541,0,0,0,8.243-3.978Z",
    transform: "translate(136.314 92.162)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_32",
    "data-name": "Path 32",
    d: "M1.8-.964V-15.57H4.5a1.205,1.205,0,0,1,.683.183.978.978,0,0,1,.387.549l.254.845a10.608,10.608,0,0,1,.873-.732,5.114,5.114,0,0,1,.965-.57,5.727,5.727,0,0,1,1.113-.366,5.971,5.971,0,0,1,1.3-.134,5.114,5.114,0,0,1,2.12.416,4.4,4.4,0,0,1,1.556,1.155,4.985,4.985,0,0,1,.958,1.761,7.3,7.3,0,0,1,.324,2.218V-.964H10.673v-9.282a2.554,2.554,0,0,0-.493-1.669,1.771,1.771,0,0,0-1.451-.6,3.038,3.038,0,0,0-1.352.31,5.258,5.258,0,0,0-1.211.831V-.964Z",
    transform: "translate(152.3 92.162)",
    fill: "#41ccc9"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_38",
    "data-name": "Path 38",
    d: "M9.265-.647H8.54V-5.422H2.3V-.647H1.575v-9.965H2.3v4.648H8.54v-4.648h.725Z",
    transform: "translate(90.524 105.175)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_37",
    "data-name": "Path 37",
    d: "M7.547-10.612v.6H2.3v4.028H6.667V-5.4H2.3v4.155H7.547v.6H1.575v-9.965Z",
    transform: "translate(100.986 105.175)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_36",
    "data-name": "Path 36",
    d: "M8.387-.6H7.868a.228.228,0,0,1-.151-.049.327.327,0,0,1-.092-.128l-1.1-2.7H1.959L.867-.782a.282.282,0,0,1-.092.125A.245.245,0,0,1,.618-.6H.1L3.911-9.9h.67ZM2.162-3.983H6.33l-1.9-4.7q-.046-.112-.092-.253t-.092-.3q-.046.158-.092.3t-.092.26Z",
    transform: "translate(109.193 104.193)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_35",
    "data-name": "Path 35",
    d: "M2.14-1.176h4.41V-.6H1.47V-9.9h.67Z",
    transform: "translate(117.993 104.193)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_34",
    "data-name": "Path 34",
    d: "M8-10.612V-10H4.5V-.647H3.784V-10H.262v-.613Z",
    transform: "translate(123.881 105.175)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("path", {
    id: "Path_33",
    "data-name": "Path 33",
    d: "M9.265-.647H8.54V-5.422H2.3V-.647H1.575v-9.965H2.3v4.648H8.54v-4.648h.725Z",
    transform: "translate(131.832 105.175)",
    fill: "#50a2d2"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_37",
    "data-name": "Line 37",
    x1: "6.774",
    y2: "4.34",
    transform: "translate(72.867 73.393)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_38",
    "data-name": "Line 38",
    x1: "6.774",
    y2: "4.34",
    transform: "translate(72.867 76.65)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_39",
    "data-name": "Line 39",
    x1: "6.774",
    y2: "4.34",
    transform: "translate(72.867 79.906)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_40",
    "data-name": "Line 40",
    x1: "3.001",
    y2: "1.923",
    transform: "translate(72.868 95.349)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_41",
    "data-name": "Line 41",
    x1: "5.804",
    y2: "3.719",
    transform: "translate(72.868 96.81)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_42",
    "data-name": "Line 42",
    x1: "6.774",
    y2: "4.34",
    transform: "translate(72.867 99.446)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_43",
    "data-name": "Line 43",
    x1: "6.889",
    y2: "4.41",
    transform: "translate(81.739 87.904)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_44",
    "data-name": "Line 44",
    x1: "6.889",
    y2: "4.41",
    transform: "translate(81.739 91.161)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_45",
    "data-name": "Line 45",
    x1: "6.889",
    y2: "4.41",
    transform: "translate(81.739 94.417)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "0.852"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_46",
    "data-name": "Line 46",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 73.878)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_47",
    "data-name": "Line 47",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 77.089)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_48",
    "data-name": "Line 48",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 80.3)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_49",
    "data-name": "Line 49",
    x2: "23.425",
    y2: "12.208",
    transform: "translate(58.461 79.855)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_50",
    "data-name": "Line 50",
    x2: "23.425",
    y2: "12.208",
    transform: "translate(58.461 83.066)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_51",
    "data-name": "Line 51",
    x2: "23.425",
    y2: "12.208",
    transform: "translate(58.461 86.277)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_52",
    "data-name": "Line 52",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 93.144)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_53",
    "data-name": "Line 53",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 96.355)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }), /*#__PURE__*/React.createElement("line", {
    id: "Line_54",
    "data-name": "Line 54",
    x2: "6.725",
    y2: "3.652",
    transform: "translate(65.773 99.565)",
    fill: "none",
    stroke: "#41ccc9",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2.273"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "header-text"
  }, "Intron Transcribe")), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-muted rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-medium text-center"
  }, currentSentence)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center items-center space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: isRecording ? stopRecording : startRecording,
    disabled: !isStartEnabled
  }, isRecording ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "class": "size-6"
  }, /*#__PURE__*/React.createElement("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
  })), "Stop Recording") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "class": "size-6"
  }, /*#__PURE__*/React.createElement("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
  })), "Start Recording")), /*#__PURE__*/React.createElement("button", {
    onClick: skipSentence
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "class": "size-6"
  }, /*#__PURE__*/React.createElement("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
  })), "Skip"), /*#__PURE__*/React.createElement("button", {
    onClick: clearRecording
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "class": "size-6"
  }, /*#__PURE__*/React.createElement("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  })), "Clear")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold"
  }, formatTime(recordingTime))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "start-recording-toggle",
    className: "text-sm font-medium"
  }, "Enable Start Recording")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Recordings:"), recordings.map(function (recording) {
    return /*#__PURE__*/React.createElement("div", {
      key: recording.id,
      className: "flex items-center justify-between bg-muted p-2 rounded"
    }, /*#__PURE__*/React.createElement("span", null, "Recording ", recording.id, " (", formatTime(recording.duration), ")"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      size: "sm",
      variant: "ghost",
      onClick: function onClick() {
        return playRecording(recording.id);
      }
    }, currentlyPlaying === recording.id ? /*#__PURE__*/React.createElement(Pause, {
      className: "h-4 w-4"
    }) : /*#__PURE__*/React.createElement(Play, {
      className: "h-4 w-4"
    })), /*#__PURE__*/React.createElement("button", {
      size: "sm",
      variant: "ghost",
      onClick: function onClick() {
        return deleteRecording(recording.id);
      }
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      "class": "size-6"
    }, /*#__PURE__*/React.createElement("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-muted p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold mb-2"
  }, "Instructions:"), /*#__PURE__*/React.createElement("ol", {
    className: "list-decimal list-inside space-y-1"
  }, /*#__PURE__*/React.createElement("li", null, "Click \"Start Recording\" to begin recording your voice."), /*#__PURE__*/React.createElement("li", null, "Read the displayed sentence aloud clearly."), /*#__PURE__*/React.createElement("li", null, "Click \"Stop Recording\" when you're finished."), /*#__PURE__*/React.createElement("li", null, "Use \"Skip\" to move to the next sentence."), /*#__PURE__*/React.createElement("li", null, "Use \"Clear\" to restart the current recording."), /*#__PURE__*/React.createElement("li", null, "Toggle the switch to enable/disable recording."), /*#__PURE__*/React.createElement("li", null, "Review your recordings in the list below."), /*#__PURE__*/React.createElement("li", null, "Play or delete your recordings as needed.")))), /*#__PURE__*/React.createElement("audio", {
    ref: audioRef,
    onEnded: function onEnded() {
      return setCurrentlyPlaying(null);
    }
  }));
}