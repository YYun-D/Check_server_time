var currentTimeElement = document.createElement('div');
currentTimeElement.id = 'current-time';
currentTimeElement.style.position = 'fixed';
currentTimeElement.style.width = '300px';
currentTimeElement.style.textAlign = 'center';
currentTimeElement.style.top = '0';
currentTimeElement.style.right = '0';
currentTimeElement.style.backgroundColor = '#fff';
currentTimeElement.style.padding = '20px';
currentTimeElement.style.zIndex = '9999';
currentTimeElement.style.fontSize = '20px';
currentTimeElement.style.fontWeight = 'bold';
currentTimeElement.style.userSelect = 'none'; // 드래그 막기
currentTimeElement.style.backgroundColor = 'lightgray';
currentTimeElement.style.borderRadius = '10px';
document.body.appendChild(currentTimeElement);

// 서버 시간 가져오기
function updateServerTime() {
    var date = new Date();
    var formattedTime = date.getFullYear() + '년 ' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '월 ' +
    ('0' + date.getDate()).slice(-2) + '일 ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2) + '.' +
    ('00' + date.getMilliseconds()).slice(-3);
    currentTimeElement.textContent = formattedTime;
}

// 서버 시간 1밀리초 간격으로 불러오기
setInterval(updateServerTime, 1);

chrome.runtime.sendMessage({action: 'getTimeDisplayStatus'}, function(response) {
    var isTimeDisplayEnabled = response.isEnabled;
    if (isTimeDisplayEnabled) enableTimeDisplay();
    else disableTimeDisplay();
});

// TimeDisplay 활성화
function enableTimeDisplay() {
    currentTimeElement.style.display = 'block';
}
// TimeDisplay 비활성화
function disableTimeDisplay() {
    currentTimeElement.style.display = 'none';
}

// 시간을 클릭하여 자유롭게 이동
var isDragging = false;
var offsetX, offsetY;

currentTimeElement.addEventListener('mousedown', function(event) {
  isDragging = true;
  offsetX = event.clientX - currentTimeElement.offsetLeft;
  offsetY = event.clientY - currentTimeElement.offsetTop;
});

document.addEventListener('mousemove', function(event) {
  if (isDragging) {
    var newLeft = event.clientX - offsetX;
    var newTop = event.clientY - offsetY;
    currentTimeElement.style.left = newLeft + 'px';
    currentTimeElement.style.top = newTop + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});