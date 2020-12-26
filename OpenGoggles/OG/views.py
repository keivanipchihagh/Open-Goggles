from django.shortcuts import render
import requests
from bs4 import BeautifulSoup, NavigableString

# Create your views here.
def index(request):
    quotes = quotes_by_author()
    
    return render(request = request, template_name = 'index.html', context = {'secret': '82c41530', 'quotes': quotes})

# Quote Scrape
def quotes_by_author(author):
    
	meta_data = []
	attempt = 0

	while attempt < 3:
    		
		try:
			# Get and parse request
			page = requests.get("https://www.goodreads.com/quotes/search?commit=Search&page=1&q=" + author.replace(" ", "+") + "&utf8=%E2%9C%93")
			soup = BeautifulSoup(page.text, 'html.parser')

			quote = soup.find(class_ = "leftContainer")
			quote_list = quote.find_all(class_ = "quoteDetails")
		except:
			attempt += 1

			if attempt == 3:
				return "Err"

		# get data for each quote
		for quote in quote_list:
			
			# Get quote's text
			try:
				outer = quote.find(class_ = "quoteText")

				inner_text = [element for element in outer if isinstance(element, NavigableString)]
				inner_text = [x.replace("\n", "") for x in inner_text]

				final_quote = "\n".join(inner_text[:-4])
				final_quote = " ".join(final_quote.split())

				meta_data.append(final_quote.strip().replace('\n', ' ').replace('―', ''))
			except:
				pass 

		return meta_data