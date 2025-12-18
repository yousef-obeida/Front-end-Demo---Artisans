<template>
   <main class="container">

        <h1>Select Books to Borrow</h1>

        <!-- رسالة التفاعل مع مربعات الاختيار -->
        <div id="selectionMessageContainer">
            <p id="selectionMessage">Please select a book to see the message.</p>
        </div>

        <!-- قائمة الكتب مع مربعات الاختيار -->
        <div id="bookChecklist">
            <!-- Book list will be injected here by JS -->
        </div>

        <div class="checkout-area">
            <button onclick="handleCheckout()" class="checkout-btn">
                Proceed to Checkout
            </button>
            <div id="checkoutStatus"></div>
        </div>
    </main>
</template>

<script>
  import { onMounted } from 'vue';          

  function renderBorrowPage() {
    var container = document.getElementById("bookChecklist");
    var html = "";

    for (var i = 0; i < books.length; i++) {
        var book = books[i];

        html +=
            '<label class="book-card-label">' +
            '<input type="checkbox" data-title="' + book.title +
            '" onchange="handleCheckboxChange()">' +
            '<img src="' + book.image + '" alt="' + book.title + '">' +
            '<div class="book-info">' +
            '<span class="book-title">' + book.title + '</span>' +
            '<span class="book-author">by ' + book.author + '</span>' +
            '</div>' +
            '</label>';
    }

    container.innerHTML = html;
    handleCheckboxChange(); // عشان يحدّث الرسالة
}

// يحدّث الرسالة فوق حسب الكتب المختارة
function handleCheckboxChange() {
    var checkboxes = document.querySelectorAll(
        "#bookChecklist input[type='checkbox']:checked"
    );
    var messageElement = document.getElementById("selectionMessage");

    var selectedTitles = [];
    for (var i = 0; i < checkboxes.length; i++) {
        selectedTitles.push(checkboxes[i].getAttribute("data-title"));
    }

    var message;

    if (selectedTitles.length === 0) {
        message = "You have not selected any books yet.";
    } else if (selectedTitles.length === 1) {
        message = "You selected: " + selectedTitles[0];
    } else {
        var lastTitle = selectedTitles.pop();
        var titleList = selectedTitles.join(", ");
        message = "You selected: " + titleList + " and " + lastTitle;
    }

    messageElement.textContent = message;
}

// زر الـ Checkout
function handleCheckout() {
    var checkboxes = document.querySelectorAll(
        "#bookChecklist input[type='checkbox']:checked"
    );
    var selectedTitles = [];
    for (var i = 0; i < checkboxes.length; i++) {
        selectedTitles.push(checkboxes[i].getAttribute("data-title"));
    }

    var statusElement = document.getElementById("checkoutStatus");

    if (selectedTitles.length === 0) {
        statusElement.style.color = "red";
        statusElement.textContent =
            "Please select at least one book to proceed to checkout.";
        return;
    }

    statusElement.style.color = "green";
    statusElement.textContent =
        "Checkout successful! You are borrowing " +
        selectedTitles.length +
        " books.";
}

// لما الصفحة تجهز: نرسم الكتب و نحمل الهيدر والفوتر
document.addEventListener("DOMContentLoaded", function () {
    // عرض الكتب
    renderBorrowPage();
});

  onMounted(() => {
    renderBorrowPage();
  });   
</script>

<style scoped>
  
body {
      font-family: Arial, sans-serif;
      background-color: #e0e0e0;
      /* رمادي فاتح جدًا */
      margin: 0;
      padding: 0;
      line-height: 1.6;
      display: block;
  }

  .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f5f5f5;
      /* رمادي أبيض للحاوية */
      border: 1px solid #ccc;
  }

  h1 {
      /* استخدام H1 لعنوان الصفحة الرئيسي */
      color: #444;
      /* رمادي داكن */
      text-align: center;
      margin-bottom: 25px;
      border-bottom: 2px solid #666;
      /* خط رمادي أغمق */
      padding-bottom: 10px;
  }

  /* رسالة التحديد */
  #selectionMessageContainer {
      padding: 10px;
      border: 1px solid #aaa;
      margin-bottom: 20px;
      background-color: #f0f0f0;
      /* رمادي فاتح لرسالة التحديد */
  }

  /* قائمة التحقق (Checklist) */
  .book-card-label {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 8px;
      background-color: white;
      cursor: pointer;
      transition: background-color 0.2s;
  }

  .book-card-label:hover {
      background-color: #f0f0f0;
      /* رمادي فاتح عند التمرير */
  }

  .book-card-label input[type="checkbox"] {
      /* حجم كبير لمربع الاختيار */
      width: 18px;
      height: 18px;
      margin-right: 15px;
  }

  .book-card-label img {
      width: 60px;
      height: 90px;
      object-fit: cover;
      margin-right: 15px;
      border: 1px solid #ccc;
      /* حدود خفيفة للصور */
  }

  .book-card-label .book-info {
      flex-grow: 1;
      color: #555;
  }

  /* زر الدفع */
  .checkout-area {
      text-align: center;
      margin-top: 30px;
  }

  .checkout-btn {
      background-color: #555;
      /* رمادي داكن كزر أساسي */
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
  }

  .checkout-btn:hover {
      background-color: #333;
      /* أسود عند التمرير */
  }

  /* تفاصيل الكتاب في القائمة */
  .book-info .book-title {
      font-weight: bold;
      color: #333;
      /* أسود للعنوان */
  }
  </style>