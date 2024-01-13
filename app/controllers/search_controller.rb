class SearchController < ApplicationController

  def index
    search_query = params[:search_query]
    ahoy.track "Search", query: search_query
  end
end
