"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, DollarSign, Banknote } from "lucide-react";

const weeks = [
  // {
  //   id: "https://script.google.com/macros/s/AKfycbyy2Olho--5SEZ3b0uWz4xnhyCUCLCrKjjbTwShzzmrduMtg6LKzq-HXAQtJMgWNuf_mg/exec",
  //   label: "تفاصيل حساب أسبوع 3 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxEg9-AdDcM8D17vGkSvMDD6QxtmUOiGp88zv6i384-kTEiFIWPgDWxfUW0zQDYkFnK_g/exec",
  //   label: "تفاصيل حساب أسبوع 10 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbz9YuHBFzIhqagU-3Vd9Nyd2tJ0kat7SWPVhUEqDitIb_2LsWFvtskwTPHrc4lBR_bL/exec",
  //   label: "تفاصيل حساب اسبوع 17 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbycfTVjw5kv23wABEFz0yZqAavGUJVZht9M--PJM9yNrKWE1KZocNmq39itgTRyLp6s/exec",
  //   label: "تفاصيل حساب اسبوع 24 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxbfgpBVFGEdIuBdh0WjCLuHlESYe0Vh25u8RU4r8VEfBuC4h423aqIWv4S1BawcdL9/exec",
  //   label: "تفاصيل حساب اسبوع 31 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxNV0tCOCFw_0Gt91lSYa0v1dhm1ZAs5BugHup_mVqv24wdL7wK5RM3tqt9acyvHMgWcA/exec",
  //   label: "تفاصيل حساب اسبوع 7 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxequAZIhWWspfK4ftvSNpIfkU4i89Aey5EGp_473f4lbI7AjRs75IC-XZfFw1hb6L79g/exec",
  //   label: "تفاصيل حساب اسبوع 14 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbz6T0NtjqCoSd9P0vU9hrPU1w2AniUkx80oNhq8Ab4kaamsEzeTL4IWQZoVIUX5meO0/exec",
  //   label: "تفاصيل حساب اسبوع 21 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxaUrH5RMLKynbgZyN7efSScQu7as1t-y-fAjrqAxHw-0uo75zeW7zjRQAw0isHDUXv/exec",
  //   label: "تفاصيل حساب اسبوع 28 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbycGlM4vHIXC-6KLXlb_glwYvp8Zmnb_OhJI8q3MNIdexsZFDt-KWxT03gweA3H8DZydQ/exec",
  //   label: "تفاصيل حساب اسبوع 5 - 10",
  // },
  {
    id: "https://script.google.com/macros/s/AKfycbyZEDmmZNPdimyQHl4L8JPN3IeXcHIr8Vc4VMASblC4mX_jqhBSRVkmorjOg7_x6OEdsA/exec",
    label: "تفاصيل حساب اسبوع 12 - 10",
  },
  {
    id: "https://script.google.com/macros/s/AKfycbw8_047hl4qss8zosbpurQismttmaGgnN7E5ud0rx3b7qeJBAKFUVzdNgHTSbufutm44A/exec",
    label: "تفاصيل حساب اسبوع 19 - 10",
  },
];

const btbWeeks = [
  // {
  //   id: "https://script.google.com/macros/s/AKfycbylkkgraB-nIqIx9JA5Z48PsF9Z1qk5qD4ztivFDsgOEXjhOg7RuX9MW05KMZknTdSI/exec",
  //   title: "تفاصيل حساب اسبوع 3 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbwMc5vR_tUJgrTiDT934CTvTbiQuQUfa7enwnPevdXp_Llt8pvcbR2iaBVeMxRC_zo/exec",
  //   title: "تفاصيل حساب اسبوع 10 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxuhiclsLRU4J5105GWcCmR3Z3nzxgSGtz3KpHavh54NscWrQgFbS2xkP3wtz_nsyjq/exec",
  //   title: "تفاصيل حساب اسبوع 17 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbwtl8kRVR8ZUoz_AmafbR1Pxe_hHmeTmhiueoj9xuWeheVIPTDcZNwgkvl2pYx9DydReQ/exec",
  //   title: "تفاصيل حساب اسبوع 24 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxCrcx9NJZ-mvcjsc7ESWdJHyBhybt5LyTTxSxLCU1Si7NUcruqt9dkzkD-ySFldVSe/exec",
  //   title: "تفاصيل حساب اسبوع 31 - 8",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycby3jbc81RdakJbm4fVjj9BMHH081Qy4kP2dBRZp8g16u-oJlYQm4cv9C-imRS_vHc2E/exec",
  //   title: "تفاصيل حساب اسبوع 7 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbzgQbvv48EJkjAECB3TfuxQH5xBsD_gL7v7zj1JElYYffQ0CjThWnnQ12WMkouZYmf_/exec",
  //   title: "تفاصيل حساب اسبوع 14 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbxzBTWQ-YHLA3Ckq4eRlM3YiEmU6FhpDEk5rJcVdYnbDANMgFWA9yZit1I0G3u2zrKEiw/exec",
  //   title: "تفاصيل حساب اسبوع 21 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbybveOiFr2YBoKtqRa-ILCG8dIk8b2NLGYeEcC9EZbt9JIUzqVGEkLoH_pZvdxeBDQ/exec",
  //   title: "تفاصيل حساب اسبوع 28 - 9",
  // },
  // {
  //   id: "https://script.google.com/macros/s/AKfycbyqLlyraa3GPBHUEluz1_WTQ8YkDj9595f4Et90DLMG6epAJ4yL6rL3LdGNHDo96z9Gnw/exec",
  //   title: "تفاصيل حساب اسبوع 5 - 10",
  // },
  {
    id: "https://script.google.com/macros/s/AKfycbwhXKgPfzcnvhlItsWKeGLukEZaKju5SA3HMAvv8wvkNKiQOdYLIyw1ezTpw86l81h7/exec",
    title: "تفاصيل حساب اسبوع 12 - 10",
  },
  {
    id: "https://script.google.com/macros/s/AKfycbwCs8iRkkskFu31jsRxg9R-fdNdtuxSzVMo4_3cuqWrY8fToW2F1_oMfA-sWOTpy1Ik/exec",
    title: "تفاصيل حساب اسبوع 19 - 10",
  },
];

const FloatingMoney = () => {
  const icons = [DollarSign, Banknote];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const randomX = Math.random() * 100;
        const delay = i * 0.5;

        return (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: "110vh", opacity: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay,
            }}
            className="absolute text-green-500 dark:text-green-400"
            style={{ left: `${randomX}%` }}
          >
            <Icon className="w-10 h-10" />
          </motion.div>
        );
      })}
    </div>
  );
};

const Page = () => {
  const handleSelect = (value: string) => {
    window.open(value, "_blank");
  };

  return (
    <div className="relative min-h-screen flex flex-col gap-10 lg:flex-row items-center lg:justify-between lg:gap-5 p-6 transition-colors">
      <FloatingMoney />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl transition-colors">
          <CardHeader className="flex flex-col items-center gap-2">
            <CalendarDays className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              💰 اختر الأسبوع لمشاهدة تفاصيل الشارع
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full rounded-xl h-12 text-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectValue placeholder="اختر الأسبوع" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg dark:bg-gray-900 dark:text-gray-100">
                {weeks.map((week) => (
                  <SelectItem
                    key={week.id}
                    value={week.id}
                    className="cursor-pointer text-lg"
                  >
                    {week.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl transition-colors">
          <CardHeader className="flex flex-col items-center gap-2">
            <CalendarDays className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              اختر الأسبوع لمشاهدة تفاصيل الشركات
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full rounded-xl h-12 text-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectValue placeholder="اختر الأسبوع" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg dark:bg-gray-900 dark:text-gray-100">
                {btbWeeks.map((btbweek) => (
                  <SelectItem
                    key={btbweek.id}
                    value={btbweek.id}
                    className="cursor-pointer text-lg"
                  >
                    {btbweek.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
