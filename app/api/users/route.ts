import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // قراءة البيانات القادمة من الفورم (body)
    const body = await request.json();
    const { name, email } = body;

    // التحقق من القيم المرسلة
    if (!name || !email) {
      return NextResponse.json(
        { message: "الاسم والبريد الإلكتروني مطلوبان " },
        { status: 400 }
      );
    }

    // في الحالة الحقيقية، يمكنك هنا حفظ البيانات في قاعدة بيانات
    console.log("بيانات المستخدم الجديد:", { name, email });

    // إرجاع رسالة نجاح
    return NextResponse.json(
      { message: `تم إضافة المستخدم ${name} بنجاح ` },
      { status: 201 }
    );
  } catch (error) {
    console.error("حدث خطأ في الـ API:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب " },
      { status: 500 }
    );
  }
}
