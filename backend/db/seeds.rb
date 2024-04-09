# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
Agent.destroy_all
Role.destroy_all
Status.destroy_all
Ticket.destroy_all
Conversation.destroy_all

# Seed data for roles
admin_role = Role.create(role: 'Admin', description: 'Administrator role')

# Seed data for agents table
Agent.create(email: 'triage@gmail.com', full_name: 'Triage', password: 'password', role_id: admin_role.id)
Agent.create(email: 'sebastianvaron96@gmail.com', full_name: 'Sebastian varon', password: 'password',
             role_id: admin_role.id)
Agent.create(email: 'glorialimartt@gmail.com', full_name: 'Gloria lim', password: 'password',
             role_id: admin_role.id)

# Seed data for statuses
Status.create(description: 'Open')
Status.create(description: 'Closed')

# Create some tickets

ticket1 = Ticket.create!(
  title: Faker::Marketing.buzzwords,
  from_email: Faker::Internet.email,
  customer_name: Faker::Name.name,
  agent_id: 1,
  status_id: 1
)

# Create conversations for the ticket
conversation1 = ticket1.conversations.create!(
  body: "I need help with my website traffic. Can you help me?",
  from_customer: true
)
conversation1.attachments.attach(io: File.open(Rails.root.join('public', 'placeholder.jpg')), filename: 'placeholder.jpg')

conversation2 = ticket1.conversations.create!(
  body: "
  off course I can help you with that. Here are some strategies to improve your website traffic:
  <br>
  <h1>Strategies to Improve Website Traffic</h1>
  <br>
  <p>Improving website traffic involves a combination of strategies focused on attracting visitors and keeping them engaged. Here are several tips to help boost your website traffic:</p>
  <br>
  <ol>
    <li>
      <h2>Search Engine Optimization (SEO)</h2>
    <br>
      <ul>
        <li>Keyword Optimization: Conduct keyword research to identify terms your audience is searching for, and optimize your website content, including titles, headings, meta descriptions, and body text, with relevant keywords.</li>
        <li>Quality Content: Create high-quality, relevant, and engaging content that provides value to your audience. Regularly update your content to keep it fresh and relevant.</li>
        <li>Mobile Optimization: Ensure your website is mobile-friendly, as more users access the internet through mobile devices.</li>
        <li>Site Speed: Improve your website's loading speed to enhance user experience and SEO rankings.</li>
      </ul>
    </li>
    <br>
    <li>
      <h2>Content Marketing</h2>
    <br>
      <ul>
        <li>Blogging: Start a blog and regularly publish informative, valuable content related to your industry or niche. Share your blog posts on social media and other platforms to drive traffic to your website.</li>
        <li>Guest Blogging: Write guest posts for other websites in your industry to reach a broader audience and gain backlinks to your site.</li>
        <li>Video Content: Incorporate video content into your website, such as tutorials, product demonstrations, or behind-the-scenes footage.</li>
      </ul>
    </li>
    <br>
    <li>
      <h2>Social Media Marketing</h2>
    <br>
      <ul>
        <li>Regular Posting: Maintain an active presence on social media platforms relevant to your audience. Share your website content, engage with your followers, and participate in relevant conversations.</li>
        <li>Visual Content: Use high-quality images, infographics, and videos to capture users' attention on social media.</li>
        <li>Social Sharing Buttons: Include social sharing buttons on your website to encourage visitors to share your content with their networks.</li>
      </ul>
    </li>
    <br>
    <li>
      <h2>Email Marketing</h2>
    <br>
      <ul>
        <li>Building an Email List: Collect email addresses from website visitors and regularly send them valuable content, promotions, and updates.</li>
        <li>Personalization: Segment your email list and personalize your email campaigns based on subscribers' interests, behavior, and preferences.</li>
        <li>CTAs (Call to Actions): Include clear and compelling CTAs in your emails to drive traffic back to your website.</li>
      </ul>
    </li>
    <br>
    <li>
      <h2>Paid Advertising</h2>
    <br>
      <ul>
        <li>PPC (Pay-Per-Click) Advertising: Use platforms like Google Ads or social media advertising to target specific keywords, demographics, and interests and drive traffic to your website.</li>
        <li>Display Advertising: Display ads on relevant websites, blogs, and social media platforms to increase brand visibility and attract new visitors.</li>
        <li>Retargeting: Implement retargeting campaigns to reach users who have previously visited your website but didn't convert.</li>
      </ul>
    </li>
    <br>
    <li>
      <h2>Analyze and Optimize</h2>
    <br>
      <ul>
        <li>Analytics: Use web analytics tools like Google Analytics to track your website traffic, user behavior, and conversion metrics. Analyze this data to identify areas for improvement and optimize your strategies accordingly.</li>
        <li>A/B Testing: Experiment with different approaches, such as website design, content formats, CTAs, and advertising campaigns, and use A/B testing to determine which ones perform best.</li>
      </ul>
    </li>
  </ol>",
  from_customer: false
)
conversation2.attachments.attach(io: File.open(Rails.root.join('public', 'placeholder.jpg')), filename: 'placeholder.jpg')

# Create another ticket
ticket2 = Ticket.create!(
  title: Faker::Marketing.buzzwords,
  from_email:  Faker::Internet.email,
  customer_name: Faker::Name.name,
  agent_id: 1,
  status_id: 1
)

# Create conversations for the ticket
conversation3 = ticket2.conversations.create!(
  body: "How can I improve my brand's visibility on social media?",
  from_customer: true
)
conversation3.attachments.attach(io: File.open(Rails.root.join('public', 'placeholder.jpg')), filename: 'placeholder.jpg')

conversation4 = ticket2.conversations.create!(
  body: "Improving your brand's visibility on social media requires a strategic approach focused on creating engaging content, building a loyal community, and leveraging various platforms effectively. Here are several tips to help improve your brand's visibility on social media:

  1. Define Your Brand Identity
  Consistent Branding: Ensure your brand's visual identity, including logos, colors, fonts, and messaging, is consistent across all social media platforms.
  Brand Voice: Develop a unique brand voice that resonates with your target audience and reflects your brand's personality, values, and mission.
  2. Understand Your Audience
  Audience Research: Conduct thorough research to understand your target audience's demographics, interests, behaviors, and pain points.
  Persona Development: Create detailed buyer personas to tailor your content and messaging to specific audience segments effectively.
  3. Create Engaging Content
  Visual Content: Use high-quality images, videos, infographics, and other visual content to capture users' attention and convey your brand's message effectively.
  Interactive Content: Encourage engagement with interactive content formats such as polls, quizzes, contests, and live streams.
  User-Generated Content: Showcase user-generated content (UGC) to foster authenticity, build trust, and involve your audience in your brand's story.
  4. Consistent Posting and Timing
  Posting Schedule: Establish a consistent posting schedule based on your audience's activity and engagement patterns. Experiment with different posting times and frequencies to determine what works best for your brand.
  Content Calendar: Plan and organize your content in advance using a content calendar to ensure a steady flow of fresh and relevant content.
  5. Engage with Your Audience
  Two-Way Communication: Actively engage with your audience by responding to comments, messages, and mentions promptly. Show appreciation for feedback and foster meaningful conversations.
  Community Building: Create a sense of community around your brand by encouraging user participation, asking questions, and sharing user-generated content.
  6. Collaborate and Partner
  Influencer Marketing: Collaborate with influencers and industry experts to reach a broader audience, build credibility, and generate buzz around your brand.
  Cross-Promotion: Partner with complementary brands or businesses to cross-promote each other's content, products, or services and expand your reach.
  7. Utilize Paid Advertising
  Social Ads: Invest in paid advertising on social media platforms to target specific demographics, interests, and behaviors. Experiment with different ad formats, targeting options, and budgets to optimize your campaigns for maximum visibility and ROI.
  8. Analyze and Optimize
  Social Analytics: Use social media analytics tools to track your performance metrics, such as reach, engagement, clicks, and conversions. Analyze this data to identify trends, insights, and areas for improvement.
  A/B Testing: Experiment with different content types, posting times, ad creatives, and targeting options, and use A/B testing to determine what resonates best with your audience.",
  from_customer: false
)
conversation4.attachments.attach(io: File.open(Rails.root.join('public', 'placeholder.jpg')), filename: 'placeholder.jpg')