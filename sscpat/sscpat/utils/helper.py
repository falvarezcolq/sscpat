import datetime


def get_date_months(date_init,date_end):
    date1 = date_init
    date2 = date_end
    date1 = date1.replace(day=1)
    date2 = date2.replace(day=1)
    date_months = []
    while date1 < date2:
        month = date1.month
        year = date1.year
        # date_months.append(date1)
        next_month = month + 1 if month != 12 else 1
        next_year = year + 1 if next_month == 1 else year
        date1 = date1.replace(month=next_month, year=next_year)
        date_months.append(date1)
    return date_months