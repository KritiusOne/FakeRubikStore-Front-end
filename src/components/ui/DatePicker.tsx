import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { ReactNode, useState } from "react"
import DatePicker from "tailwind-datepicker-react"

interface ITheme {
  background: string;
  todayBtn: string;
  clearBtn: string;
  icons: string;
  text: string;
  disabledText: string;
  input: string;
  inputIcon: string;
  selected: string;
}
interface IIcons {
  prev: () => ReactNode | JSX.Element;
  next: () => ReactNode | JSX.Element;
  // Si tienes otros iconos, agrégalos aquí.
  today?: () => ReactNode | JSX.Element;
  clear?: () => ReactNode | JSX.Element;
}

interface IOptions {
  title?: string; // Default: "disabled"
  autoHide?: boolean; // Default: true
  todayBtn?: boolean; // Default: true
  todayBtnText?: string; // Default: "Today"
  clearBtn?: boolean; // Default: true
  clearBtnText?: string; // Default: "Clear"
  maxDate?: Date; // Default: "disabled"
  minDate?: Date; // Default: "disabled"
  theme?: ITheme; // Default: "As seen on demo page"
  icons?: IIcons; // Default: "As seen on demo page"
  datepickerClassNames?: string; // Default: ""
  defaultDate?: false | Date; // Default: new Date()
  language?: string; // Default: "en"
  disabledDates?: Date[]; // Default: []
  weekDays?: string[]; // Default: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  inputNameProp?: string; // Default: "date"
  inputIdProp?: string; // Default: Same as "inputNameProp"
  inputPlaceholderProp?: string; // Default: "Select Date"
  inputDateFormatProp?: Intl.DateTimeFormatOptions; // Default: {day: "numeric", month: "long", year: "numeric"}
}
const options: IOptions = {
	title: "Seleccione su fecha",
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-slate-700",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "text-white hover:text-black",
		disabledText: "opacity-50",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		prev: ()=> <IconArrowLeft /> ,
		next: () => <IconArrowRight /> ,
	},
	datepickerClassNames: "top-12 z-50",
	defaultDate: new Date("2022-01-01"),
	language: "es",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}
export const ComponetDatePicker: React.FC = () => {
	const [show, setShow] = useState<boolean>(false)
	const handleChange = (selectedDate: Date) => {
		console.log(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div>
			<DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}