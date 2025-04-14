import SwiftUI

struct HomeView: View {
    @State private var searchText: String = ""
    @State private var isSearching: Bool = false

    var body: some View {
        ScrollView {
            VStack(spacing: 30.0) {
                HStack {
                    Text("MovieNest")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.white)

                    Spacer()

                    Button(action: {
                        withAnimation {
                            isSearching.toggle()
                        }
                    }) {
                        Image(systemName: "magnifyingglass")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 25, height: 25)
                            .foregroundColor(.white)
                    }
                }
                .padding()

                if isSearching {
                    TextField("Search for movies...", text: $searchText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding(.horizontal)
                        .transition(.move(edge: .top))
                }

                
                VStack(spacing: 5) {
                    ScrollSection()
                    Hindi()
                    Telugu()
                }
                .padding(.horizontal)
                .offset(x: -20, y: -20)
            }
            .frame(maxWidth: .infinity, alignment: .top)
        }
        .background(
            LinearGradient(gradient: Gradient(colors: [Color.black, Color.red]),
                           startPoint: .top,
                           endPoint: .bottomTrailing)
                .edgesIgnoringSafeArea(.all)
        )
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
