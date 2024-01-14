class SearchChannel < ApplicationCable::Channel

  def subscribed
    stream_from "search_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Handle incoming messages here
    case data['command']
    when 'search'
      handle_search(data['query'])
    else
      # Handle other commands if needed
    end
  end

  private

  def handle_search(query)
    Rails.logger.info("Received search query: #{query}")
    @most_recent_query = query
    buffer_timer
  end

  def buffer_timer
    @buffer_timer&.cancel
    @buffer_timer = Concurrent::ScheduledTask.execute(1.5) do
      process_search
    end
  end

   def process_search
    final_query = @most_recent_query

    Rails.logger.info("Processing search query: #{final_query}")
  end
end
