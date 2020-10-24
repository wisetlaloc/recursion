class Solution
  def self.integer_of_pairs(numbers)
    counts = numbers.inject(Hash.new(0)) do |count, n|
      count[n] += 1
      count
    end

    counts.select { |k, v| v == 2 }.keys
  end
end
    
