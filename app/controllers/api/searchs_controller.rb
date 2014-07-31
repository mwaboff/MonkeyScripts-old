module Api
  class SearchsController < ApplicationController

    def search
      query = URI.unescape(params[:term])
      if query.length >= 3
        result = run_search(query)
        render json: result
      else
        render nothing: true
      end
    end

    private
    def run_search(search_string)
      fuzzed_search = fuzzify(search_string, 3)
      sql_string = generate_sql(fuzzed_search)
      search_results = search_db(sql_string, fuzzed_search)
      return search_results
    end

    def fuzzify(search_string, depth)
      result = []
      fuzzed_list = search_string.gsub(/\W/,'').downcase
      (fuzzed_list.length - (depth - 1)).times do |idx|
        result.push('%'+fuzzed_list[idx, depth]+'%')
      end
      result
    end

    def generate_sql(fuzzed_list)
      where_sql = []
      fuzzed_list.each do |phrase|
        where_sql.push("tags.tag_name LIKE ?")
      end

      #where_sql = ["tags.tag_name LIKE '%hac%'", "tags.tag_name LIKE '%ack%'"]
      sql_search = <<-SQL
      SELECT
        scripts.id,
        scripts.title,
        scripts.short_desc,
        SUM(tag_joins.value) as score
      FROM
        scripts
      JOIN
        tag_joins
      ON
        scripts.id = tag_joins.script_id
      JOIN
        tags
      ON
        tag_joins.tag_id = tags.id
      WHERE
        #{where_sql.join(' OR ')}
      GROUP BY
        scripts.id
      ORDER BY
        score
      DESC
      SQL
      
      sql_search
    end

    def search_db(sql_string, fuzzed_list)
      #ActiveRecord::Base.connection.execute(sql_string, fuzzed_list);
      searchArray = fuzzed_list.unshift(sql_string)
      Script.find_by_sql(searchArray);
      #Script.find_by_sql([sql_string, '%hac%', '%ack%'])
      #Script.find_by_sql(sql_string)

    end

  end
end