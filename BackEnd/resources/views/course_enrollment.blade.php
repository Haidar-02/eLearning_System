<!DOCTYPE html>
<html>
<head>

</head>
<body>
    <div>
        <p>Hello,</p>
    <p>You have successfully enrolled in the following course:</p>
    <p>Course Name: {{ $course->name }}</p>
    <p>Course Code: {{ $course->code }}</p>
    <p>Course Description: {{ $course->description }}</p>
    <p>Course Start Date: {{ $course->start_date }}</p>
    <p>Course End Date: {{ $course->end_date }}</p>
    <p>Thank you for choosing our platform for your learning needs!</p>
</div>
</body>
</html>