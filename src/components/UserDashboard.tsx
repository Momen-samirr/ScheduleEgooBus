import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UserDashboard = () => {
  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>EgooBus</CardTitle>
        <CardDescription>EgooBus</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p>
              {" "}
              نتشرف بدعوة حضراتكم للانضمام إلى أسطولنا المميز لخدمات النقل الذكي
              🌟
            </p>
            <p>
              معنا، الدخل الشهري يصل إلى 50,000 جنيه! لو كنت هاي إس، الكوستر،
              والأتوبيس و 15,000 جنيه للعربيات الملاكي 😍
            </p>
          </div>
          <h3 className=" text-xl text-sky-500">ليه تختار شركتنا </h3>
        </div>
        <div className="mt-5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>سيستم متطور وسهل الاستخدام</AccordionTrigger>
              <AccordionContent>
                يتيح للكابتن الدخول واختيار الرحلات المناسبة له بكل سهولة{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>مواعيد صرف منتظمة</AccordionTrigger>
              <AccordionContent>
                القبض كل أسبوعين (مرتين في الشهر) لضمان راحتك المادية.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>مراكز صيانة دورية</AccordionTrigger>
              <AccordionContent>
                نضمن لك صيانة سيارتك بشكل منتظم للحفاظ على أمانك وسلامة مركبتك.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>الدخل ثابت ومضمون</AccordionTrigger>
              <AccordionContent>
                مع فرص لزيادة الدخل الشهري من خلال البونصات والمكافآت.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger> دعم كامل 24/7</AccordionTrigger>
              <AccordionContent>
                فريق متخصص لمساعدتك في أي وقت وأي مشكلة.{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>مرونة في العمل</AccordionTrigger>
              <AccordionContent>الشغل على جدولك، وقتك ملكك!</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>تواصل معانا</AccordionTrigger>
              <AccordionContent>📞 01044811952 (whatsapp)</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDashboard;
